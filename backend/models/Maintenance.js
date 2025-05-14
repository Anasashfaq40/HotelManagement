const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  issue: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "in progress", "completed"], 
    default: "pending" 
  }
}, { timestamps: true });

module.exports = mongoose.model("Maintenance", MaintenanceSchema);