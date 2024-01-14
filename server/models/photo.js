const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    dateTaken: {
        type: Date,
        required: true
    },
    plantId: {
        type: Number,
        ref: 'Plant', // Reference to the Plant model
        required: true
    },
    userId: {
        type: Number,
        ref: 'User', // Reference to the User model
        required: true
    },
    photoUrl: {
        type: String, // URL as a string
        required: true // Set to false if the URL can be added later
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
