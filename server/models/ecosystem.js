const mongoose = require('mongoose');

const ecosystemSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId, // This should be ObjectId
        ref: 'Greenhouse', // Reference to the Greenhouse model
        required: true
    }
});


const Ecosystem = mongoose.model('Ecosystem', ecosystemSchema);

module.exports = Ecosystem;
