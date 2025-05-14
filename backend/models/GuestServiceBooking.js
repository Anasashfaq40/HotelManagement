// const mongoose = require("mongoose");

// const GuestServiceBookingSchema = new mongoose.Schema({
//   guest: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   booking: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Booking",
//     required: true
//   },
//   services: [{
//     service: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Service"
//     },
//     quantity: { type: Number, default: 1 },
//     scheduledTime: { type: Date },
//     specialInstructions: { type: String },
//     status: {
//       type: String,
//       enum: ["requested", "confirmed", "in-progress", "completed", "cancelled"],
//       default: "requested"
//     }
//   }],
//   totalServiceAmount: { type: Number, default: 0 },
//   status: {
//     type: String,
//     enum: ["active", "completed", "cancelled"],
//     default: "active"
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("GuestServiceBooking", GuestServiceBookingSchema);


const mongoose = require("mongoose");

const GuestServiceBookingSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  services: [{
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    quantity: { 
      type: Number, 
      default: 1,
      min: 1
    },
    scheduledTime: { type: Date },
    specialInstructions: { type: String },
    status: {
      type: String,
      enum: ["requested", "confirmed", "in-progress", "completed", "cancelled"],
      default: "requested"
    },
    priceAtBooking: {  
      type: Number,
      required: true
    }
  }],
  totalServiceAmount: { 
    type: Number, 
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active"
  }
}, { 
  timestamps: true
});

module.exports = mongoose.model("GuestServiceBooking", GuestServiceBookingSchema);