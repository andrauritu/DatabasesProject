const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        maxlength: 50
    },
    username: {
        type: String,
        required: true,
        maxlength: 50
    },
    dateJoined: {
        type: Date,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
