const mongoose = require('mongoose');

const ecosystemSchema = new mongoose.Schema({
    _id: Number, // Using a custom ID if you want to set it manually
    type: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    greenhouseId: {
        type: mongoose.Schema.Types.ObjectId, // This is a reference to another model
        ref: 'Greenhouse', // Reference to the Greenhouse model
        required: true
    }
});

const Ecosystem = mongoose.model('Ecosystem', ecosystemSchema);

module.exports = Ecosystem;
