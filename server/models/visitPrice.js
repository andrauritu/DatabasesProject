const mongoose = require('mongoose');

const visitPriceSchema = new mongoose.Schema({
    _id: Number, // Custom ID if you want to set it manually
    price: {
        type: Number,
        required: true
    },
    visitId: {
        type: Number,
        ref: 'Visit', // Reference to the Visit model
        required: true
    }
});

const VisitPrice = mongoose.model('VisitPrice', visitPriceSchema);

module.exports = VisitPrice;
