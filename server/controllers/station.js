const Station = require("../models/station");
const Bike = require("../models/bike");


module.exports.getStations = async(req,res) => {
    const stations = await Station.find({});

    return res.json(stations)
}