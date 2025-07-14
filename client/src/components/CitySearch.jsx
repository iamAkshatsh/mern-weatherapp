import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CitySearch = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField
        label="Enter city"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </Box>
  );
};

export default CitySearch;
