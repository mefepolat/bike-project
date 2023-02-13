const Bike = require('../models/bike');


module.exports.getBikes = async (req,res,next) => {
    const bike = await Bike.find({});
    console.log(bike);
    return res.json(bike);
}