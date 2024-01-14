const mongoose = require('mongoose');

const visitTimeSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    duration: {
        type: Number,
        required: true
    },
    visitId: {
        type: Number,
        ref: 'Visit', // Reference to the Visit model
        required: true
    }
});

const VisitTime = mongoose.model('VisitTime', visitTimeSchema);

module.exports = VisitTime;
