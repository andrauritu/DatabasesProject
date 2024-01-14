const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    commonName: {
        type: String,
        required: true,
        maxlength: 50
    },
    scientificName: {
        type: String,
        required: true,
        maxlength: 50
    },
    plantId: {
        type: Number,
        ref: 'Plant', // Reference to the Plant model
        required: true
    }
});

const Species = mongoose.model('Species', speciesSchema);

module.exports = Species;
