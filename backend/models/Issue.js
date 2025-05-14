const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming user model
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  status: { 
    type: String, 
    enum: ["pending", "clear"], 
    default: "pending" 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Issue", issueSchema);
