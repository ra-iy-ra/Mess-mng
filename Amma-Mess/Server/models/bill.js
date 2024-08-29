const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planType: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  selectedMeals: {
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
  },
  status: { type: String, default: 'Active' },
  paymentStatus: { type: String, default: 'Pending' },
  paymentDate: { type: Date },
});

module.exports = mongoose.model('Bill', billSchema);


