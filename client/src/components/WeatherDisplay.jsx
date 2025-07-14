// components/WeatherDisplay.js
import React from 'react';
import { Typography } from '@mui/material';

function WeatherDisplay({ weather }) {
  const { name, main, wind, weather: details } = weather;

  return (
    <div className="weather-container">
      <div className="weather-info-box">
        <Typography variant="h6">🌍 City</Typography>
        <Typography>{name}</Typography>
      </div>

      <div className="weather-info-box">
        <Typography variant="h6">🌡️ Temperature</Typography>
        <Typography>{main.temp}°C</Typography>
      </div>

      <div className="weather-info-box">
        <Typography variant="h6">📉 Min Temp</Typography>
        <Typography>{main.temp_min}°C</Typography>
      </div>

      <div className="weather-info-box">
        <Typography variant="h6">📈 Max Temp</Typography>
        <Typography>{main.temp_max}°C</Typography>
      </div>

      <div className="weather-info-box">
        <Typography variant="h6">💧 Humidity</Typography>
        <Typography>{main.humidity}%</Typography>
      </div>

      <div className="weather-info-box">
        <Typography variant="h6">🌬️ Wind</Typography>
        <Typography>{wind.speed} m/s</Typography>
      </div>

      <div className="weather-info-box">
        <Typography variant="h6">🌥️ Condition</Typography>
        <Typography>{details[0].main}</Typography>
      </div>
    </div>
  );
}

export default WeatherDisplay;
