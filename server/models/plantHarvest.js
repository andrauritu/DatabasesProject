const mongoose = require('mongoose');

const plantHarvestSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    dateHarvested: {
        type: Date,
        required: true
    },
    speciesId: {
        type: Number,
        ref: 'Species', // Reference to the Species model
        required: true
    }
});

const PlantHarvest = mongoose.model('PlantHarvest', plantHarvestSchema);

module.exports = PlantHarvest;
