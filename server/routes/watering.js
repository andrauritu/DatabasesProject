const express = require('express');
const router = express.Router();
const Watering = require('../models/watering'); // Replace with your actual Watering model path

// GET all watering records
router.get('/', async (req, res) => {
    try {
        const waterings = await Watering.find();
        res.json(waterings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific watering record by ID
router.get('/:id', async (req, res) => {
    try {
        const watering = await Watering.findById(req.params.id);
        if (!watering) return res.status(404).json({ message: 'Watering record not found' });
        res.json(watering);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new watering record
router.post('/', async (req, res) => {
    const watering = new Watering({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        frequency: req.body.frequency,
        lastWatered: req.body.lastWatered,
        plantId: req.body.plantId,
        workerId: req.body.workerId
    });

    try {
        const newWatering = await watering.save();
        res.status(201).json(newWatering);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific watering record
router.put('/:id', async (req, res) => {
    try {
        const updatedWatering = await Watering.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWatering) return res.status(404).json({ message: 'Watering record not found' });
        res.json(updatedWatering);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific watering record
router.delete('/:id', async (req, res) => {
    try {
        const watering = await Watering.findByIdAndDelete(req.params.id);
        if (!watering) return res.status(404).json({ message: 'Watering record not found' });
        res.json({ message: 'Watering record deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
