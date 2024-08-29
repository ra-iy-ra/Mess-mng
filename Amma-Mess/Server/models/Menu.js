const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  day: { type: String, required: true },
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  dinner: { type: String, required: true },
});

module.exports = mongoose.model('Menu', menuSchema);
