const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, async (req, res) => {
  try {
    // Validate request body
    const { booking, room, rating, comment, anonymous } = req.body;
    
    if (!booking || !room || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (booking, room, or rating)'
      });
    }

    // Validate rating (1-5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Check if booking exists and belongs to user
    const bookingExists = await Booking.findOne({
      _id: booking,
      user: req.user.id
    });
    
    if (!bookingExists) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or does not belong to user'
      });
    }

    // Check if room exists
    const roomExists = await Room.findById(room);
    if (!roomExists) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    // Check if review already exists for this booking
    const existingReview = await Review.findOne({ booking });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a review for this booking'
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user.id,
      booking,
      room,
      rating,
      comment: comment || '',
      anonymous: anonymous || false,
      status: 'pending' // Add status field
    });

    res.status(201).json({
      success: true,
      data: review
    });

  } catch (error) {
    console.error('Review creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create review',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

  router.get('/user', authenticateUser, async (req, res) => {
    try {
      const reviews = await Review.find({ user: req.user._id }) // Use req.user._id
        .populate('room', 'roomNumber type')
        .populate('user', 'name') // Add if you want user details
        .sort('-createdAt');
  
      res.status(200).json({  // Explicit status code
        success: true,
        data: reviews  // Directly send reviews array
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user reviews',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

// Get reviews for a room
router.get('/room/:roomId', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      room: req.params.roomId,
      status: 'approved'
    })
    .populate('user', 'name profileImage')
    .sort('-createdAt');

    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch room reviews'
    });
  }
});







// Get all reviews (admin only)
router.get('/', authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name')  
      .populate('room', 'roomNumber');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// Approve review (admin only)
router.put('/:id/approve', authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Reject review (admin only)
router.put('/:id/reject', authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;