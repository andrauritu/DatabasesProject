const express = require('express');
const router = express.Router();
const Terrain = require('../models/terrain'); // Replace with your actual Terrain model path

// GET all terrains
router.get('/', async (req, res) => {
    try {
        const terrains = await Terrain.find();
        res.json(terrains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific terrain by ID
router.get('/:id', async (req, res) => {
    try {
        const terrain = await Terrain.findById(req.params.id);
        if (!terrain) return res.status(404).json({ message: 'Terrain not found' });
        res.json(terrain);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new terrain
router.post('/', async (req, res) => {
    const terrain = new Terrain({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        type: req.body.type,
        features: req.body.features,
        ecosystemId: req.body.ecosystemId
    });

    try {
        const newTerrain = await terrain.save();
        res.status(201).json(newTerrain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific terrain
router.put('/:id', async (req, res) => {
    try {
        const updatedTerrain = await Terrain.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTerrain) return res.status(404).json({ message: 'Terrain not found' });
        res.json(updatedTerrain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific terrain
router.delete('/:id', async (req, res) => {
    try {
        const terrain = await Terrain.findByIdAndDelete(req.params.id);
        if (!terrain) return res.status(404).json({ message: 'Terrain not found' });
        res.json({ message: 'Terrain deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
