const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Get weather for a city (used when searching)
router.get('/weather/:city', weatherController.getWeather);

// Save a city (called after search)
router.post('/cities', weatherController.saveCity);

// Get saved cities
router.get('/cities', weatherController.getSavedCities);

// Delete city by ID
router.delete('/cities/:id', weatherController.deleteCity);

module.exports = router;
