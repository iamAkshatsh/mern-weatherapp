const axios = require('axios');
const City = require('../models/City');

const API_KEY = process.env.OPENWEATHER_API_KEY;

// GET /api/weather/:city
exports.getWeather = async (req, res) => {
  const city = req.params.city;
  console.log('City received in request:', city);

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching weather:', err.message);
    res.status(404).json({ message: 'City not found' });
  }
};

// POST /api/cities
exports.saveCity = async (req, res) => {
  const { name, weather } = req.body;

  console.log('✅ POST /api/cities hit');
  console.log('📦 Payload received:', req.body);

  if (!name || !weather) {
    console.error('❌ Missing name or weather in request');
    return res.status(400).json({ message: 'Missing name or weather data' });
  }

  try {
    const city = new City({ name, weather });
    await city.save();
    console.log('✅ City saved successfully:', city);
    res.status(201).json(city);
  } catch (err) {
    console.error('❌ Error saving city:', err.message);
    res.status(500).json({ message: 'Error saving city' });
  }
};

// GET /api/cities
exports.getSavedCities = async (req, res) => {
  try {
    const cities = await City.find().sort({ createdAt: -1 });
    res.json(cities);
  } catch (err) {
    console.error('❌ Error fetching saved cities:', err.message);
    res.status(500).json({ message: 'Error fetching cities' });
  }
};

// DELETE /api/cities/:id
exports.deleteCity = async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    console.log('🗑️ City deleted:', req.params.id);
    res.json({ message: 'City deleted' });
  } catch (err) {
    console.error('❌ Error deleting city:', err.message);
    res.status(500).json({ message: 'Error deleting city' });
  }
};
