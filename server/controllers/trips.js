const Trips = require('../models/trip');


module.exports.getTrips = async(req,res,next) => {
    const trips = await Trips.find({})
    console.log(trips);
    res.setHeader('Content-Type', 'application/json');
    res.json(trips);
}