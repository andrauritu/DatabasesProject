const mongoose = require('mongoose');

const soilTypeSchema = new mongoose.Schema({
    // _id: Number, // Custom ID if you want to set it manually
    type: {
        type: String,
        required: true,
        maxlength: 50
    },
    terrainId: {
        type: Number,
        ref: 'Terrain', // Reference to the Terrain model
        required: true
    }
});

const SoilType = mongoose.model('SoilType', soilTypeSchema);

module.exports = SoilType;
