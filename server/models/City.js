const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    weather: { type: Object, required: true }
  },
  {
    timestamps: true //  adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model('City', CitySchema);
