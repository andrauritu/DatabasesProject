const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    greenhouseId: {
        type: Number,
        ref: 'Greenhouse', // Reference to the Greenhouse model
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: Number,
        ref: 'User', // Reference to the User model
        required: true
    }
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
