const mongoose = require('mongoose');

const pesticideSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    type: {
        type: String,
        required: true,
        maxlength: 50
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
    },
    date: {
        type: Date,
        required: true
    }
});

const Pesticide = mongoose.model('Pesticide', pesticideSchema);

module.exports = Pesticide;
