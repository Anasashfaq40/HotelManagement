

// const mongoose = require("mongoose");

// const BookingSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   room: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Room",
//     required: true,
//   },
//   checkInDate: { type: Date, required: true },
//   checkOutDate: { type: Date, required: true },
//   adults: { type: Number, required: true },
//   children: { type: Number, required: true },
//   status: { 
//     type: String, 
//     enum: ["pending", "confirmed", "checked-in", "checked-out", "cancelled"], 
//     default: "pending" 
//   },
//   roomCharges: { type: Number, default: 0 },
//   serviceCharges: { type: Number, default: 0 },
//   taxAmount: { type: Number, default: 0 },
//   totalAmount: { type: Number, default: 0 },
//   paymentStatus: { 
//     type: String, 
//     enum: ["pending", "partial", "paid", "refunded"], 
//     default: "pending" 
//   },
//   invoiceNumber: { type: String },
//   deletedAt: Date
// }, { timestamps: true });

// module.exports = mongoose.model("Booking", BookingSchema);


const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  staffName: { type: String, required: true, default: "N/A" },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "checked-in", "checked-out", "cancelled"], 
    default: "pending" 
  },
  roomCharges: { type: Number, default: 0 },
  serviceCharges: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  paymentStatus: { 
    type: String, 
    enum: ["pending", "partial", "paid", "refunded"], 
    default: "pending" 
  },
  invoiceNumber: { type: String },
  serviceBookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "GuestServiceBooking"
  }],
  deletedAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);