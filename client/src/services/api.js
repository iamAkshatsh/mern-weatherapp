import axios from 'axios';

const API_BASE = 'https://mern-weatherapp.onrender.com/api';

export const fetchWeather = (city) => axios.get(`${API_BASE}/weather/${city}`);
export const saveCity = (data) => axios.post(`${API_BASE}/cities`, data);
export const getSavedCities = () => axios.get(`${API_BASE}/cities`);
export const deleteCity = (id) => axios.delete(`${API_BASE}/cities/${id}`);

