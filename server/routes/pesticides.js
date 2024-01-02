const express = require('express');
const router = express.Router();
const Pesticide = require('../models/pesticide'); // Replace with your actual Pesticide model path

// GET all pesticides
router.get('/', async (req, res) => {
    try {
        const pesticides = await Pesticide.find();
        res.json(pesticides);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific pesticide by ID
router.get('/:id', async (req, res) => {
    try {
        const pesticide = await Pesticide.findById(req.params.id);
        if (!pesticide) return res.status(404).json({ message: 'Pesticide not found' });
        res.json(pesticide);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new pesticide
router.post('/', async (req, res) => {
    const pesticide = new Pesticide({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        type: req.body.type,
        plantId: req.body.plantId,
        workerId: req.body.workerId,
        date: req.body.date
    });

    try {
        const newPesticide = await pesticide.save();
        res.status(201).json(newPesticide);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific pesticide
router.put('/:id', async (req, res) => {
    try {
        const updatedPesticide = await Pesticide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPesticide) return res.status(404).json({ message: 'Pesticide not found' });
        res.json(updatedPesticide);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific pesticide
router.delete('/:id', async (req, res) => {
    try {
        const pesticide = await Pesticide.findByIdAndDelete(req.params.id);
        if (!pesticide) return res.status(404).json({ message: 'Pesticide not found' });
        res.json({ message: 'Pesticide deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
