const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    duration: {
        type: Number
    },
    start_station: {
        type: String
    },
    end_station: {
        type: String
    },
    rider: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bike: {
        type: Schema.Types.ObjectId,
        ref: 'Bike'
    }
})

module.exports = mongoose.model('Trip', tripSchema);