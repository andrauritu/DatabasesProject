const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');

// GET all plants
router.get('/', async (req, res) => {
    try {
        const plants = await Plant.find();
        res.json(plants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new plant
router.post('/', async (req, res) => {
    const plant = new Plant({
        _id: req.body._id, // Assuming you're sending a custom ID, remove if not needed
        datePlanted: req.body.datePlanted,
        height: req.body.height,
        greenhouseId: req.body.greenhouseId
    });

    try {
        const newPlant = await plant.save();
        res.status(201).json(newPlant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) return res.status(404).json({ message: 'Plant not found' });
        res.json(plant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlant) return res.status(404).json({ message: 'Plant not found' });
        res.json(updatedPlant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const plant = await Plant.findByIdAndDelete(req.params.id);
        if (!plant) return res.status(404).json({ message: 'Plant not found' });
        res.json({ message: 'Plant deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Additional routes (GET, PUT, DELETE) for a specific plant can be added here

module.exports = router;
