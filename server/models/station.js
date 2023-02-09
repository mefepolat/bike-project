const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const stationSchema = new Schema({
    stationName: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required:true
        }
    }
})

module.exports = mongoose.model('Station', stationSchema);