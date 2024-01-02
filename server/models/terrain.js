const mongoose = require('mongoose');

const terrainSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    type: {
        type: String,
        required: true,
        maxlength: 50
    },
    features: {
        type: String,
        required: true,
        maxlength: 1000
    },
    ecosystemId: {
        type: Number,
        ref: 'Ecosystem', // Reference to the Ecosystem model
        required: true
    }
});

const Terrain = mongoose.model('Terrain', terrainSchema);

module.exports = Terrain;
