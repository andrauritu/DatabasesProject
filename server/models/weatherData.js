const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    date: {
        type: Date,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    precipitation: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    locationId: {
        type: Number,
        ref: 'Location', // Reference to the Location model
        required: true
    }
});

const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

module.exports = WeatherData;
