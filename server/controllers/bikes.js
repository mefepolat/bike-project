const Bike = require('../models/bike');


module.exports.getBikes = async (req,res,next) => {
    const filter = {
        isRented: {$eq: false},
        isInMaintenance: {$eq: false}
    }
    const bike = await Bike.find(filter);
    return res.json(bike);
}