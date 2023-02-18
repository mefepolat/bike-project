const Bike = require("../models/bike");
const Station = require("../models/station");

module.exports.getBikes = async (req, res, next) => {
  const { station: stationId } = req.query;

  try {
    const station = await Station.findOne({ _id: stationId }).populate(
      "availableBikes"
    );
    console.log(station.availableBikes);
    if (!station) {
      return res.status(404).json({ message: "station not found" });
    }
    const bikes = await Bike.find({
      _id: { $in: station.availableBikes },
      isRented: { $eq: false },
      isInMaintenance: { $eq: false },
    });
    console.log(bikes);

    res.json(bikes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};
