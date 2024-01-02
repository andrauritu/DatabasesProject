const express = require('express');
const router = express.Router();
const PlantHarvest = require('../models/plantHarvest'); // Replace with your actual PlantHarvest model path

// GET all plant harvests
router.get('/', async (req, res) => {
    try {
        const plantHarvests = await PlantHarvest.find();
        res.json(plantHarvests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific plant harvest by ID
router.get('/:id', async (req, res) => {
    try {
        const plantHarvest = await PlantHarvest.findById(req.params.id);
        if (!plantHarvest) return res.status(404).json({ message: 'Plant harvest not found' });
        res.json(plantHarvest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new plant harvest
router.post('/', async (req, res) => {
    const plantHarvest = new PlantHarvest({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        dateHarvested: req.body.dateHarvested,
        speciesId: req.body.speciesId
    });

    try {
        const newPlantHarvest = await plantHarvest.save();
        res.status(201).json(newPlantHarvest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific plant harvest
router.put('/:id', async (req, res) => {
    try {
        const updatedPlantHarvest = await PlantHarvest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlantHarvest) return res.status(404).json({ message: 'Plant harvest not found' });
        res.json(updatedPlantHarvest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific plant harvest
router.delete('/:id', async (req, res) => {
    try {
        const plantHarvest = await PlantHarvest.findByIdAndDelete(req.params.id);
        if (!plantHarvest) return res.status(404).json({ message: 'Plant harvest not found' });
        res.json({ message: 'Plant harvest deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
