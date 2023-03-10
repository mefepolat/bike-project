const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
  bikeType: {
    type: String,
  },
  isRented: {
    type: Boolean,
    default: false,
  },
  isInMaintenance: {
    type: Boolean,
    default: false,
  },
  station: {
    type: Schema.Types.ObjectId,
    ref: "Station",
  },
});

module.exports = mongoose.model("Bike", bikeSchema);
