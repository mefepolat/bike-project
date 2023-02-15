const Trip = require('../models/trip');
const Bike = require('../models/bike');
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports.getTrips = async(req,res,next) => {
    const trips = await Trips.find({});
    if(!trips){
        throw new ExpressError(`There's a problem with the database`, 400);
    }
    console.log(trips);
    res.setHeader('Content-Type', 'application/json');
    res.json(trips);
}


module.exports.postTrip = async(req,res,next) => {
    const {bikeId, startDate, station, user} = req.body;
    const rider = user._id;
    const addTrip = await User.findById(user._id);
    const bike = await Bike.findById(bikeId);
    const activeTrip = await Trip.findOne({ rider: rider, end_date: { $eq: null } });
  if (activeTrip) {
    return res.json({ message: 'You already have an active trip' });
  }

    if(!bike){
       return res.json({message: 'Bike is not available or not found.'});
    }
    if(bike.isRented){
        return res.json({message: 'Bike is rented'});
    }
    bike.isRented = true;
    await bike.save();

    const trip = new Trip({
        bike: bikeId,
        start_date: startDate,
        start_station: station,
        rider
    })
    
    await trip.save();
    addTrip.trips.push(trip._id);
    await addTrip.save();
    return res.json({message: "Your trip has started!", trip} );
};

module.exports.endTrip = async(req,res,next) => {
    const {endDate, endStation, tripId} = req.body;
    
    
    const trip = await Trip.findByIdAndUpdate(tripId.tripId, {end_date: endDate, end_station: endStation, isActive: false});
    if(!trip){
       return res.json({message: "Trip not found!"});
    }
    const objectId = new ObjectId(trip.bike)
    const bikeId = objectId.toString();
   
    const bike = await Bike.findByIdAndUpdate(bikeId, {isRented: false});
    
    if(!bike){
        res.json({message: "Bike not found!"});
    }
    
    
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
        message: 'No trips found for this user.',
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