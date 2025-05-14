const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["available", "booked", "checked-in", "checked-out", "rejected","cleaning", "maintenance"], default: "available" 
  },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Room", RoomSchema);
