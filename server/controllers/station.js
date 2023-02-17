const Station = require("../models/station");



module.exports.getStations = async(req,res) => {
    const stations = await Station.find({}).populate('availableBikes');

    return res.json(stations)
}