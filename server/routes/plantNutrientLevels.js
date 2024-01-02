const express = require('express');
const router = express.Router();
const PlantNutrientLevel = require('../models/plantNutrientLevel'); // Replace with your actual PlantNutrientLevel model path

// GET all plant nutrient levels
router.get('/', async (req, res) => {
    try {
        const plantNutrientLevels = await PlantNutrientLevel.find();
        res.json(plantNutrientLevels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific plant nutrient level by ID
router.get('/:id', async (req, res) => {
    try {
        const plantNutrientLevel = await PlantNutrientLevel.findById(req.params.id);
        if (!plantNutrientLevel) return res.status(404).json({ message: 'Plant nutrient level not found' });
        res.json(plantNutrientLevel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new plant nutrient level
router.post('/', async (req, res) => {
    const plantNutrientLevel = new PlantNutrientLevel({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        nitrogen: req.body.nitrogen,
        phosphorus: req.body.phosphorus,
        potassium: req.body.potassium,
        plantId: req.body.plantId
    });

    try {
        const newPlantNutrientLevel = await plantNutrientLevel.save();
        res.status(201).json(newPlantNutrientLevel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific plant nutrient level
router.put('/:id', async (req, res) => {
    try {
        const updatedPlantNutrientLevel = await PlantNutrientLevel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlantNutrientLevel) return res.status(404).json({ message: 'Plant nutrient level not found' });
        res.json(updatedPlantNutrientLevel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific plant nutrient level
router.delete('/:id', async (req, res) => {
    try {
        const plantNutrientLevel = await PlantNutrientLevel.findByIdAndDelete(req.params.id);
        if (!plantNutrientLevel) return res.status(404).json({ message: 'Plant nutrient level not found' });
        res.json({ message: 'Plant nutrient level deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
