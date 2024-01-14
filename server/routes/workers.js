const express = require('express');
const router = express.Router();
const Worker = require('../models/worker'); // Replace with your actual Worker model path

// GET all workers
router.get('/', async (req, res) => {
    try {
        const workers = await Worker.find();
        res.json(workers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific worker by ID
router.get('/:id', async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (!worker) return res.status(404).json({ message: 'Worker not found' });
        res.json(worker);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new worker
router.post('/', async (req, res) => {
    const worker = new Worker({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        name: req.body.name,
        roleDescription: req.body.roleDescription,
        salary: req.body.salary,
        userId: req.body.userId
    });

    try {
        const newWorker = await worker.save();
        res.status(201).json(newWorker);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific worker
router.put('/:id', async (req, res) => {
    try {
        const updatedWorker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorker) return res.status(404).json({ message: 'Worker not found' });
        res.json(updatedWorker);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific worker
router.delete('/:id', async (req, res) => {
    try {
        const worker = await Worker.findByIdAndDelete(req.params.id);
        if (!worker) return res.status(404).json({ message: 'Worker not found' });
        res.json({ message: 'Worker deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
