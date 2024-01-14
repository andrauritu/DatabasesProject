const express = require('express');
const router = express.Router();
const WeatherData = require('../models/weatherData'); // Replace with your actual WeatherData model path

// GET all weather data records
router.get('/', async (req, res) => {
    try {
        const weatherDataRecords = await WeatherData.find();
        res.json(weatherDataRecords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific weather data record by ID
router.get('/:id', async (req, res) => {
    try {
        const weatherData = await WeatherData.findById(req.params.id);
        if (!weatherData) return res.status(404).json({ message: 'Weather data record not found' });
        res.json(weatherData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new weather data record
router.post('/', async (req, res) => {
    const weatherData = new WeatherData({
        _id: req.body._id, // Remove if you're not specifying the ID manually
        date: req.body.date,
        temperature: req.body.temperature,
        precipitation: req.body.precipitation,
        humidity: req.body.humidity,
        locationId: req.body.locationId
    });

    try {
        const newWeatherData = await weatherData.save();
        res.status(201).json(newWeatherData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a specific weather data record
router.put('/:id', async (req, res) => {
    try {
        const updatedWeatherData = await WeatherData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWeatherData) return res.status(404).json({ message: 'Weather data record not found' });
        res.json(updatedWeatherData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific weather data record
router.delete('/:id', async (req, res) => {
    try {
        const weatherData = await WeatherData.findByIdAndDelete(req.params.id);
        if (!weatherData) return res.status(404).json({ message: 'Weather data record not found' });
        res.json({ message: 'Weather data record deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
