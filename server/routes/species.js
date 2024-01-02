const express = require('express');
const router = express.Router();
const Species = require('../models/species'); // Replace with your actual Species model path

// GET all species
router.get('/', async (req, res) => {
    try {
        const species = await Species.find();
        res.json(species);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific species by ID
router.get('/:id', async (req, res) => {
    try {
        const species = await Species.findById(req.params.id);
        if (!species) return res.status(404).json({ message: 'Species not found' });
        res.json(species);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new species
router.post('/', async (req, res) => {
    const species = new Species({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        commonName: req.body.commonName,
        scientificName: req.body.scientificName,
        plantId: req.body.plantId
    });

    try {
        const newSpecies = await species.save();
        res.status(201).json(newSpecies);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific species
router.put('/:id', async (req, res) => {
    try {
        const updatedSpecies = await Species.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSpecies) return res.status(404).json({ message: 'Species not found' });
        res.json(updatedSpecies);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific species
router.delete('/:id', async (req, res) => {
    try {
        const species = await Species.findByIdAndDelete(req.params.id);
        if (!species) return res.status(404).json({ message: 'Species not found' });
        res.json({ message: 'Species deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
