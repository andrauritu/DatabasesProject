const mongoose = require('mongoose');

// Define the Greenhouse schema
const greenhouseSchema = new mongoose.Schema({
    _id: Number, // If you want to specify the Greenhouse ID manually
    name: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const Greenhouse = mongoose.model('Greenhouse', greenhouseSchema);

module.exports = Greenhouse;
