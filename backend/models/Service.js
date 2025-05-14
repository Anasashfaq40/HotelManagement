const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Laundry', 'Transport', 'Spa', 'Gym', 'Pool']
  },
  description: String,
  price: { 
    type: Number, 
    required: true 
  },
  availableTimes: {
    start: String,  // Format: "HH:MM" (e.g., "07:00")
    end: String     // Format: "HH:MM" (e.g., "22:00")
  },
  image: {
    type: String,
    default: ""
  },
  requiresTimeSlot: {
    type: Boolean,
    default: true
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Service", ServiceSchema);