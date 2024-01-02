const express = require('express');
const router = express.Router();
const Ecosystem = require('../models/ecosystem'); // Make sure to replace with your actual Ecosystem model

// GET all ecosystems
router.get('/', async (req, res) => {
    try {
        const ecosystems = await Ecosystem.find();
        res.json(ecosystems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific ecosystem by ID
router.get('/:id', async (req, res) => {
    try {
        const ecosystem = await Ecosystem.findById(req.params.id);
        if (!ecosystem) return res.status(404).json({ message: 'Ecosystem not found' });
        res.json(ecosystem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new ecosystem
router.post('/', async (req, res) => {
    const ecosystem = new Ecosystem({
        // Set ecosystem properties from req.body\
        _id: req.body._id, // Assuming you're sending a custom ID, remove if not needed
        type: req.body.type,
        description: req.body.description,
        greenhouseId: req.body.greenhouseId
    });

    try {
        const newEcosystem = await ecosystem.save();
        res.status(201).json(newEcosystem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific ecosystem
router.put('/:id', async (req, res) => {
    try {
        const updatedEcosystem = await Ecosystem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEcosystem) return res.status(404).json({ message: 'Ecosystem not found' });
        res.json(updatedEcosystem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific ecosystem
router.delete('/:id', async (req, res) => {
    try {
        const ecosystem = await Ecosystem.findByIdAndDelete(req.params.id);
        if (!ecosystem) return res.status(404).json({ message: 'Ecosystem not found' });
        res.json({ message: 'Ecosystem deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
