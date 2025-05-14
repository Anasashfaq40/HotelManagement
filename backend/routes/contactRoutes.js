const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');
const Contact = require('../models/Feedback');


router.post('/submit', authenticateUser, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const userId = req.user._id;

    const newContact = new Contact({
      user: userId,
      name,
      email,
      phone,
      subject,
      message
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! We will contact you soon.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit form. Please try again later.'
    });
  }
});


router.get('/admin/feedback', authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const feedback = await Contact.find().populate('user', 'name email');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;