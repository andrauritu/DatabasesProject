const express = require('express');
const router = express.Router();
const WorkSchedule = require('../models/workSchedule'); // Replace with your actual WorkSchedule model path

// GET all work schedules
router.get('/', async (req, res) => {
    try {
        const workSchedules = await WorkSchedule.find();
        res.json(workSchedules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific work schedule by ID
router.get('/:id', async (req, res) => {
    try {
        const workSchedule = await WorkSchedule.findById(req.params.id);
        if (!workSchedule) return res.status(404).json({ message: 'Work schedule not found' });
        res.json(workSchedule);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new work schedule
router.post('/', async (req, res) => {
    const workSchedule = new WorkSchedule({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        date: req.body.date,
        workHours: req.body.workHours,
        workerId: req.body.workerId
    });

    try {
        const newWorkSchedule = await workSchedule.save();
        res.status(201).json(newWorkSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific work schedule
router.put('/:id', async (req, res) => {
    try {
        const updatedWorkSchedule = await WorkSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorkSchedule) return res.status(404).json({ message: 'Work schedule not found' });
        res.json(updatedWorkSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific work schedule
router.delete('/:id', async (req, res) => {
    try {
        const workSchedule = await WorkSchedule.findByIdAndDelete(req.params.id);
        if (!workSchedule) return res.status(404).json({ message: 'Work schedule not found' });
        res.json({ message: 'Work schedule deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
