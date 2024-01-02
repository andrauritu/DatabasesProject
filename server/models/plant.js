const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    datePlanted: {
        type: Date,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    greenhouseId: {
        type: Number,
        ref: 'Greenhouse', // Reference to the Greenhouse model
        required: true
    }
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
