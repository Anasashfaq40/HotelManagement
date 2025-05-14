const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    unique: true,
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  roomCharges: {
    roomNumber: String,
    roomType: String,
    ratePerNight: Number,
    nights: Number,
    subtotal: Number
  },
  serviceCharges: [{
    name: String,
    quantity: Number,
    unitPrice: Number,
    total: Number
  }],
  tax: {
    rate: Number,
    amount: Number
  },
  discount: {
    type: {
      type: String,
      enum: ['percentage', 'fixed']
    },
    value: Number,
    amount: Number
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'cash', 'bank_transfer', 'other']
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);