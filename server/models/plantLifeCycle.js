const mongoose = require('mongoose');

const plantLifeCycleSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    germinationDate: {
        type: Date,
        required: true
    },
    maturityDate: {
        type: Date,
        required: true
    },
    plantId: {
        type: Number,
        ref: 'Plant', // Reference to the Plant model
        required: true
    }
});

const PlantLifeCycle = mongoose.model('PlantLifeCycle', plantLifeCycleSchema);

module.exports = PlantLifeCycle;
