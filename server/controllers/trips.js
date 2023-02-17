const Trip = require('../models/trip');
const Bike = require('../models/bike');
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;
const Station = require('../models/station');

module.exports.getTrips = async(req,res,next) => {
    const trips = await Trips.find({});
    if(!trips){
        throw new ExpressError(`There's a problem with the database`, 400);
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.json(trips);
}


module.exports.postTrip = async(req,res,next) => {
    const {bikeId, startDate, station: stationId, user} = req.body;
   
    const rider = user._id;
    const activeTrip = await Trip.findOne({ rider: rider, isActive: { $eq: true } });
    if (activeTrip) {
        return res.json({ message: 'You already have an active trip' });
      }
    const addTrip = await User.findById(user._id);

    if(!addTrip){
        return res.json({
            message:"Cannot find the user, not authorized."
        })
    };
    
    const bike = await Bike.findById(bikeId);
    if(!bike){
        return res.json({message: 'Bike is not available or not found.'});
     }
     if(bike.isRented){
         return res.json({message: 'Bike is rented'});
     }
    const station = await Station.findByIdAndUpdate(stationId, {$pull: {availableBikes: bikeId}});
    bike.isRented = true;
    await bike.save();

    const trip = new Trip({
        bike: bikeId,
        start_date: startDate,
        start_station: station.stationName,
        rider
    })
    
    await trip.save();
    addTrip.trips.push(trip._id);
    await addTrip.save();
    return res.json({message: "Your trip has started!", trip} );
};

module.exports.endTrip = async(req,res,next) => {
    const {endDate, selectedStation: endStationId, tripId} = req.body;
    const trip = await Trip.findByIdAndUpdate(tripId.tripId, {end_date: endDate, isActive: false});
    const objectId = new ObjectId(trip.bike)
    const bikeId = objectId.toString();
    const endStation = await Station.findOneAndUpdate({_id: endStationId}, {$push: {availableBikes: bikeId}});
    trip.end_station = endStation.stationName;
    const bike = await Bike.findByIdAndUpdate(bikeId, {isRented: false, station: endStationId});
   
    
    if(!trip){
       return res.json({message: "Trip not found!"});
    }
    

    
    if(!bike){
        res.json({message: "Bike not found!"});
    }

    if(!endStationId){
        res.json({message: "No such end station found."})
    }
    
    await trip.save();
    await bike.save();

    res.json({trip});
}


module.exports.checkTripStatus = async(req,res) => {
    const {user} = req.session;
    
    if (!user || !user._id) {
        return res.status(401).json({
            message: 'User not found or invalid.',
            data: null
        });
    }
    const latestTrip = await Trip.findOne({rider: user._id})
    .sort({start_date: -1})
    .limit(1);
    

if (!latestTrip) {
    return res.status(401).json({
        message: 'Empty',
        data: null
    });
}


if (latestTrip.isActive) {
    return res.status(200).json({
        message: 'Active trip found.',
        data: {tripId: latestTrip._id}
    }) 
} else {
    
    return res.status(200).json({
        message: 'No active trips found for this user.',
        data: null
    });
}
};