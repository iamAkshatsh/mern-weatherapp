import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  ListItemIcon,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const SavedCities = ({ cities, onDelete, onClick }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        Saved Cities
      </Typography>
      <List>
        {cities.map((city) => (
          <ListItem
            key={city._id}
            button
            onClick={() => onClick(city.name)}
            sx={{
              borderRadius: '12px',
              mb: 1,
              backgroundColor: isDark ? '#34495e' : '#f5f5f5',
              '&:hover': {
                backgroundColor: isDark ? '#3b536b' : '#e0e0e0',
              }
            }}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(city._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            }
          >
            <ListItemIcon>
              <LocationCityIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight="bold">
                  {city.name}
                </Typography>
              }
              secondary={
                city.weather
                  ? `${city.weather.main.temp}°C • ${city.weather.weather[0].main}`
                  : ''
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SavedCities;
