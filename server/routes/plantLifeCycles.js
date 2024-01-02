const express = require('express');
const router = express.Router();
const PlantLifeCycle = require('../models/plantLifeCycle'); // Replace with your actual PlantLifeCycle model path

// GET all plant life cycles
router.get('/', async (req, res) => {
    try {
        const plantLifeCycles = await PlantLifeCycle.find();
        res.json(plantLifeCycles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific plant life cycle by ID
router.get('/:id', async (req, res) => {
    try {
        const plantLifeCycle = await PlantLifeCycle.findById(req.params.id);
        if (!plantLifeCycle) return res.status(404).json({ message: 'Plant life cycle not found' });
        res.json(plantLifeCycle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new plant life cycle
router.post('/', async (req, res) => {
    const plantLifeCycle = new PlantLifeCycle({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        germinationDate: req.body.germinationDate,
        maturityDate: req.body.maturityDate,
        plantId: req.body.plantId
    });

    try {
        const newPlantLifeCycle = await plantLifeCycle.save();
        res.status(201).json(newPlantLifeCycle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific plant life cycle
router.put('/:id', async (req, res) => {
    try {
        const updatedPlantLifeCycle = await PlantLifeCycle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlantLifeCycle) return res.status(404).json({ message: 'Plant life cycle not found' });
        res.json(updatedPlantLifeCycle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific plant life cycle
router.delete('/:id', async (req, res) => {
    try {
        const plantLifeCycle = await PlantLifeCycle.findByIdAndDelete(req.params.id);
        if (!plantLifeCycle) return res.status(404).json({ message: 'Plant life cycle not found' });
        res.json({ message: 'Plant life cycle deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
