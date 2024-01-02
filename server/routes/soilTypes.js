const express = require('express');
const router = express.Router();
const SoilType = require('../models/soilType'); // Replace with your actual SoilType model path

// GET all soil types
router.get('/', async (req, res) => {
    try {
        const soilTypes = await SoilType.find();
        res.json(soilTypes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific soil type by ID
router.get('/:id', async (req, res) => {
    try {
        const soilType = await SoilType.findById(req.params.id);
        if (!soilType) return res.status(404).json({ message: 'Soil type not found' });
        res.json(soilType);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new soil type
router.post('/', async (req, res) => {
    const soilType = new SoilType({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        type: req.body.type,
        terrainId: req.body.terrainId
    });

    try {
        const newSoilType = await soilType.save();
        res.status(201).json(newSoilType);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific soil type
router.put('/:id', async (req, res) => {
    try {
        const updatedSoilType = await SoilType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSoilType) return res.status(404).json({ message: 'Soil type not found' });
        res.json(updatedSoilType);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific soil type
router.delete('/:id', async (req, res) => {
    try {
        const soilType = await SoilType.findByIdAndDelete(req.params.id);
        if (!soilType) return res.status(404).json({ message: 'Soil type not found' });
        res.json({ message: 'Soil type deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
