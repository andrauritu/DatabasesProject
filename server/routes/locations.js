const express = require('express');
const router = express.Router();
const Location = require('../models/location'); // Replace with your actual Location model path

// GET all locations
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific location by ID
router.get('/:id', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) return res.status(404).json({ message: 'Location not found' });
        res.json(location);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new location
router.post('/', async (req, res) => {
    const location = new Location({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        name: req.body.name,
        region: req.body.region,
        climate: req.body.climate,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        ecosystemId: req.body.ecosystemId
    });

    try {
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific location
router.put('/:id', async (req, res) => {
    try {
        const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });
        res.json(updatedLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific location
router.delete('/:id', async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) return res.status(404).json({ message: 'Location not found' });
        res.json({ message: 'Location deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
