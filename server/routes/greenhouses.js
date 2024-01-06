const express = require('express');
const router = express.Router();
const Greenhouse = require('../models/greenhouse'); // Replace with your actual Greenhouse model path

// GET all greenhouses
router.get('/', async (req, res) => {
    try {
        const greenhouses = await Greenhouse.find();
        res.json(greenhouses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific greenhouse by ID
router.get('/:id', async (req, res) => {
    try {
        const greenhouse = await Greenhouse.findById(req.params.id);
        if (!greenhouse) return res.status(404).json({ message: 'Greenhouse not found' });
        res.json(greenhouse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new greenhouse
router.post('/', async (req, res) => {
    const greenhouse = new Greenhouse({
        // _id: req.body._id, // Remove if you're not specifying the ID manually
        name: req.body.name
    });

    try {
        const newGreenhouse = await greenhouse.save();
        res.status(201).json(newGreenhouse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific greenhouse
router.put('/:id', async (req, res) => {
    try {
        const updatedGreenhouse = await Greenhouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGreenhouse) return res.status(404).json({ message: 'Greenhouse not found' });
        res.json(updatedGreenhouse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific greenhouse
router.delete('/:id', async (req, res) => {
    try {
        const greenhouse = await Greenhouse.findByIdAndDelete(req.params.id);
        if (!greenhouse) return res.status(404).json({ message: 'Greenhouse not found' });
        res.json({ message: 'Greenhouse deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
