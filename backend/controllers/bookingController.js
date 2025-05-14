const Booking = require("../models/Booking");
const Room = require("../models/Room");

// ✅ Book a Room
exports.bookRoom = async (req, res) => {
  try {
    const { user, room, checkInDate, checkOutDate } = req.body;
    const newBooking = new Booking({ user, room, checkInDate, checkOutDate });
    await newBooking.save();
    res.status(201).json({ message: "Room booked successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all Bookings
// exports.getBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate("user room");
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// ✅ Update Booking Status
exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






exports.checkoutBooking = async (req, res) => {
  try {
    // Find the booking and populate related data with proper error handling
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'room',
        select: 'roomNumber type price status'
      })
      .populate({
        path: 'user',
        select: 'name email contact'
      });

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    // Check if guest exists and is populated
    if (!booking.user || !booking.user._id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking: guest information missing'
      });
    }

    // Verify the booking belongs to the requesting user
    if (booking.user._id.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to checkout this booking' 
      });
    }

    // Validate booking status
    if (booking.status === 'checked-out') {
      return res.status(400).json({ 
        success: false, 
        message: 'Booking already checked out' 
      });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({ 
        success: false, 
        message: 'Only checked-in bookings can be checked out' 
      });
    }

    // Update booking status
    booking.status = 'checked-out';
    booking.actualCheckOutDate = new Date();
    
    // Check if room exists and is populated
    if (!booking.room || !booking.room._id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking: room information missing'
      });
    }

    // Update room status
    const room = await Room.findById(booking.room._id);
    if (!room) {
      return res.status(400).json({
        success: false,
        message: 'Associated room not found'
      });
    }
    
    room.status = 'checked-out';
    await room.save();

    // Save the updated booking
    const updatedBooking = await booking.save();

    // Prepare response data with additional checks
    const responseData = {
      _id: updatedBooking._id,
      status: updatedBooking.status,
      room: {
        roomNumber: updatedBooking.room?.roomNumber || 'N/A',
        type: updatedBooking.room?.type || 'N/A'
      },
      checkInDate: updatedBooking.checkInDate,
      checkOutDate: updatedBooking.checkOutDate,
      actualCheckOutDate: updatedBooking.actualCheckOutDate
    };

    res.status(200).json({
      success: true,
      data: responseData,
      message: 'Successfully checked out'
    });

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during checkout',
      error: error.message
    });
  }
};