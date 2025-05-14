const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema({
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  requestType: { type: String, required: true }, // e.g., "room service", "wake-up call"
  details: { type: String },
  status: { 
    type: String, 
    enum: ["pending", "completed"], 
    default: "pending" 
  }
}, { timestamps: true });

module.exports = mongoose.model("ServiceRequest", ServiceRequestSchema);