const express = require('express');
const router = express.Router();
const VisitPrice = require('../models/visitPrice'); // Replace with your actual VisitPrice model path

// GET all visit prices
router.get('/', async (req, res) => {
    try {
        const visitPrices = await VisitPrice.find();
        res.json(visitPrices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific visit price by ID
router.get('/:id', async (req, res) => {
    try {
        const visitPrice = await VisitPrice.findById(req.params.id);
        if (!visitPrice) return res.status(404).json({ message: 'Visit price not found' });
        res.json(visitPrice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new visit price
router.post('/', async (req, res) => {
    const visitPrice = new VisitPrice({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        price: req.body.price,
        visitId: req.body.visitId
    });

    try {
        const newVisitPrice = await visitPrice.save();
        res.status(201).json(newVisitPrice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific visit price
router.put('/:id', async (req, res) => {
    try {
        const updatedVisitPrice = await VisitPrice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVisitPrice) return res.status(404).json({ message: 'Visit price not found' });
        res.json(updatedVisitPrice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific visit price
router.delete('/:id', async (req, res) => {
    try {
        const visitPrice = await VisitPrice.findByIdAndDelete(req.params.id);
        if (!visitPrice) return res.status(404).json({ message: 'Visit price not found' });
        res.json({ message: 'Visit price deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
