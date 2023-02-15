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
    const {endDate, endStation} = req.body;
    const {tripId} = req.params;
    const trip = await Trip.findByIdAndUpdate(tripId, {end_date: endDate, end_station: endStation, isActive: false});
    if(!trip){
       return res.json({message: "Trip not found!"});
    }
    const objectId = new ObjectId(trip.bike)
    const bikeId = objectId.toString();
    console.log(bikeId)
    const bike = await Bike.findByIdAndUpdate(bikeId, {isRented: false});
    
    if(!bike){
        res.json({message: "Bike not found!"});
    }
    
    
    await bike.save();

    res.json({trip});
}