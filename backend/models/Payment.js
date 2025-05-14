const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["credit card", "paypal", "cash"], required: true },
  invoiceUrl: { type: String }, // Store invoice PDF URL
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
