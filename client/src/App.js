// App.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Button,
  IconButton,
  Grid
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloudIcon from '@mui/icons-material/Cloud';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

import CitySearch from './components/CitySearch';
import SavedCities from './components/SavedCities';
import { fetchWeather, saveCity, getSavedCities, deleteCity } from './services/api';

import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [savedCities, setSavedCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadSavedCities();
  }, []);

  const loadSavedCities = async () => {
    try {
      const res = await getSavedCities();
      setSavedCities(res.data);
    } catch {
      setError('Failed to load saved cities.');
    }
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const res = await fetchWeather(city);
      setWeather(res.data);
    } catch {
      setError('City not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!weather) return;
    try {
      await saveCity({ name: weather.name, weather });
      loadSavedCities();
    } catch {
      setError('Failed to save city.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCity(id);
      loadSavedCities();
    } catch {
      setError('Failed to delete city.');
    }
  };

  const handleSavedCityClick = (cityName) => {
    handleSearch(cityName);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const getWeatherClass = () => {
    if (!weather) return '';
    const mainCondition = weather.weather[0].main.toLowerCase();
    if (mainCondition.includes('cloud')) return 'cloudy';
    if (mainCondition.includes('rain')) return 'rainy';
    if (mainCondition.includes('clear')) return 'sunny';
    if (mainCondition.includes('snow')) return 'snowy';
    return 'default-weather'
  };

  const themeClass = darkMode ? 'dark-mode' : '';

  return (
    <div className={`app ${themeClass}`}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper
          elevation={4}
          className={`weather-card ${darkMode ? 'dark' : ''} ${getWeatherClass()}`}
        >
          <div className="header">
            <Typography variant="h4" align="center" gutterBottom>
              🌦️ Weather App
            </Typography>
            <IconButton onClick={toggleTheme} className="toggle-btn">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>

          <CitySearch onSearch={handleSearch} loading={loading} />

          {error && <p className="error">{error}</p>}
          {loading && <CircularProgress className="loader" />}

          {weather && (
            <>
              <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                <LocationOnIcon /> {weather.name}, {weather.sys?.country}
              </Typography>

              <div className="weather-image-wrapper">
                {weather.weather[0].main.toLowerCase() === 'clear' ? (
                  <div className="real-sun"></div>
                ) : (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt={weather.weather[0].description}
                    className="weather-image"
                  />
                )}
              </div>

              <Grid container spacing={2} className="info-container">
                <Grid item xs={6} sm={4}>
                  <div className="info-item">
                    <div className="info-value"><ThermostatIcon /> {weather.main.temp}°C</div>
                    <div className="info-title">Temperature</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div className="info-item">
                    <div className="info-value"><CloudIcon /> {weather.weather[0].main}</div>
                    <div className="info-title">Condition</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div className="info-item">
                    <div className="info-value"><WaterDropIcon /> {weather.main.humidity}%</div>
                    <div className="info-title">Humidity</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div className="info-item">
                    <div className="info-value"><AirIcon /> {weather.wind.speed} m/s</div>
                    <div className="info-title">Wind Speed</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div className="info-item">
                    <div className="info-value"><ArrowUpwardIcon /> {weather.main.temp_max}°C</div>
                    <div className="info-title">Max Temp</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div className="info-item">
                    <div className="info-value"><ArrowDownwardIcon /> {weather.main.temp_min}°C</div>
                    <div className="info-title">Min Temp</div>
                  </div>
                </Grid>
              </Grid>

              <div className="save-button-wrapper">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                  className="save-btn"
                  startIcon={<BookmarkAddOutlinedIcon />}
                >
                  Save City
                </Button>
              </div>
            </>
          )}

          <SavedCities
            cities={savedCities}
            onDelete={handleDelete}
            onClick={handleSavedCityClick}
          />
        </Paper>
      </Container>
    </div>
  );
}

export default App;
