const mongoose = require('mongoose');

const wateringSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    frequency: {
        type: Number,
        required: true
    },
    lastWatered: {
        type: Date,
        required: true
    },
    plantId: {
        type: Number,
        ref: 'Plant', // Reference to the Plant model
        required: true
    },
    workerId: {
        type: Number,
        ref: 'Worker', // Reference to the Worker model
        required: true
    }
});

const Watering = mongoose.model('Watering', wateringSchema);

module.exports = Watering;
