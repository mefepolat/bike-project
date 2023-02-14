const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Report', reportSchema);  // transfers to database as "reports"