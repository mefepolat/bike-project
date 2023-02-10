const Trips = require('../models/trip');
const ExpressError = require('../utils/ExpressError');

module.exports.getTrips = async(req,res,next) => {
    const trips = await Trips.find({});
    if(!trips){
        throw new ExpressError(`There's a problem with the database`, 400);
    }
    console.log(trips);
    res.setHeader('Content-Type', 'application/json');
    res.json(trips);
}