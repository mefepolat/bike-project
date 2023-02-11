const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
    bikeType: {
        type: String
    },
    isInCirculation: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Bike', bikeSchema);