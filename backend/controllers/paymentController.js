const Payment = require("../models/Payment");

// ✅ Process Payment
exports.processPayment = async (req, res) => {
  try {
    const { user, booking, amount, status } = req.body;
    const newPayment = new Payment({ user, booking, amount, status });
    await newPayment.save();
    res.status(201).json({ message: "Payment processed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Payment Details
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("user booking");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};