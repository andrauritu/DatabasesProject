const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    roleDescription: {
        type: String,
        required: true,
        maxlength: 1000
    },
    salary: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        ref: 'User', // Reference to the User model
        required: true
    }
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
