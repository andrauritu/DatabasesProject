const express = require('express');
const router = express.Router();
const VisitTime = require('../models/visitTime'); // Replace with your actual VisitTime model path

// GET all visit times
router.get('/', async (req, res) => {
    try {
        const visitTimes = await VisitTime.find();
        res.json(visitTimes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific visit time by ID
router.get('/:id', async (req, res) => {
    try {
        const visitTime = await VisitTime.findById(req.params.id);
        if (!visitTime) return res.status(404).json({ message: 'Visit time not found' });
        res.json(visitTime);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new visit time
router.post('/', async (req, res) => {
    const visitTime = new VisitTime({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        duration: req.body.duration,
        visitId: req.body.visitId
    });

    try {
        const newVisitTime = await visitTime.save();
        res.status(201).json(newVisitTime);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific visit time
router.put('/:id', async (req, res) => {
    try {
        const updatedVisitTime = await VisitTime.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVisitTime) return res.status(404).json({ message: 'Visit time not found' });
        res.json(updatedVisitTime);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific visit time
router.delete('/:id', async (req, res) => {
    try {
        const visitTime = await VisitTime.findByIdAndDelete(req.params.id);
        if (!visitTime) return res.status(404).json({ message: 'Visit time not found' });
        res.json({ message: 'Visit time deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
