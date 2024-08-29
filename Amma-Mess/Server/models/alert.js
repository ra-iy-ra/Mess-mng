const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['meal_cancellation', 'single_meal_cancellation'], 
        default: 'meal_cancellation',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    viewed: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Alert', alertSchema)