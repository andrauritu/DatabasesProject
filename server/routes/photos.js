const express = require('express');
const router = express.Router();
const Photo = require('../models/photo'); // Replace with your actual Photo model path

// GET all photos
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.json(photos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific photo by ID
router.get('/:id', async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) return res.status(404).json({ message: 'Photo not found' });
        res.json(photo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new photo
router.post('/', async (req, res) => {
    const photo = new Photo({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        dateTaken: req.body.dateTaken,
        plantId: req.body.plantId,
        userId: req.body.userId,
        photoUrl: req.body.photoUrl
    });

    try {
        const newPhoto = await photo.save();
        res.status(201).json(newPhoto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific photo
router.put('/:id', async (req, res) => {
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPhoto) return res.status(404).json({ message: 'Photo not found' });
        res.json(updatedPhoto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific photo
router.delete('/:id', async (req, res) => {
    try {
        const photo = await Photo.findByIdAndDelete(req.params.id);
        if (!photo) return res.status(404).json({ message: 'Photo not found' });
        res.json({ message: 'Photo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
