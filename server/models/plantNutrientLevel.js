const mongoose = require('mongoose');

const plantNutrientLevelSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    nitrogen: {
        type: Number,
        required: true
    },
    phosphorus: {
        type: Number,
        required: true
    },
    potassium: {
        type: Number,
        required: true
    },
    plantId: {
        type: Number,
        ref: 'Plant', // Reference to the Plant model
        required: true
    }
});

const PlantNutrientLevel = mongoose.model('PlantNutrientLevel', plantNutrientLevelSchema);

module.exports = PlantNutrientLevel;
