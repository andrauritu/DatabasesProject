const express = require('express');
const router = express.Router();
const Visit = require('../models/visit'); // Replace with your actual Visit model path

// GET all visits
router.get('/', async (req, res) => {
    try {
        const visits = await Visit.find();
        res.json(visits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific visit by ID
router.get('/:id', async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (!visit) return res.status(404).json({ message: 'Visit not found' });
        res.json(visit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new visit
router.post('/', async (req, res) => {
    const visit = new Visit({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        greenhouseId: req.body.greenhouseId,
        date: req.body.date,
        userId: req.body.userId
    });

    try {
        const newVisit = await visit.save();
        res.status(201).json(newVisit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific visit
router.put('/:id', async (req, res) => {
    try {
        const updatedVisit = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVisit) return res.status(404).json({ message: 'Visit not found' });
        res.json(updatedVisit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific visit
router.delete('/:id', async (req, res) => {
    try {
        const visit = await Visit.findByIdAndDelete(req.params.id);
        if (!visit) return res.status(404).json({ message: 'Visit not found' });
        res.json({ message: 'Visit deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
