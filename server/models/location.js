const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    region: {
        type: String,
        required: true,
        maxlength: 150
    },
    climate: {
        type: String,
        required: true,
        maxlength: 50
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    ecosystemId: {
        type: Number,
        ref: 'Ecosystem', // Reference to the Ecosystem model
        required: true
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
