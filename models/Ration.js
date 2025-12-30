const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: String,
    relation: String
});

const rationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    houseName: {
        type: String,
        required: true
    },
    rationNo: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        enum: ['APL', 'BPL'],
        required: true
    },
    members: [memberSchema]
});

module.exports = mongoose.model('Ration', rationSchema);
