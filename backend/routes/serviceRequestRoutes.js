const express = require("express");
const { requestService, getServiceRequests } = require("../controllers/serviceRequestController");

const router = express.Router();

router.post("/", requestService);
router.get("/", getServiceRequests);

// Similar modifications for PUT route
router.put('/:id', authenticateUser, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, startTime, endTime, isActive } = req.body;
    
    const serviceFields = {
      name,
      description,
      price,
      isActive
    };

    // Only update times if service requires them
    if (['Breakfast', 'Lunch', 'Dinner'].includes(name)) {
      serviceFields.availableTimes = {
        start: startTime,
        end: endTime
      };
      serviceFields.requiresTimeSlot = true;
    } else {
      serviceFields.availableTimes = null;
      serviceFields.requiresTimeSlot = false;
    }

    // Update image if new one was uploaded
    if (req.file) {
      serviceFields.image = req.file.path;
    }

    let service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: serviceFields },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete service
// @access  Private (Admin)
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    await Service.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.post('/bookings', authenticateUser, createServiceBooking);
router.get('/bookings', authenticateUser,getUserServiceBookings);



// PUT endpoint to update service status
router.put('/bookings/:bookingId/update-status', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { serviceIndex, status } = req.body;

    // Validate input
    if (!bookingId || serviceIndex === undefined || !status) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields: bookingId, serviceIndex, or status" 
      });
    }

    // Find the booking
    const booking = await GuestServiceBooking.findById(bookingId)
      .populate('guest', 'name email')
      .populate('booking', 'roomNumber')
      .populate('services.service', 'name price');

    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: "Service booking not found" 
      });
    }

    // Validate service index
    if (serviceIndex < 0 || serviceIndex >= booking.services.length) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid service index" 
      });
    }

    // Validate status transition
    const currentStatus = booking.services[serviceIndex].status;
    const validTransitions = {
      'requested': ['confirmed', 'cancelled'],
      'confirmed': ['in-progress', 'cancelled'],
      'in-progress': ['completed'],
      'completed': [],
      'cancelled': []
    };

    if (!validTransitions[currentStatus].includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: `Invalid status transition from ${currentStatus} to ${status}`
      });
    }

    // Update the service status
    booking.services[serviceIndex].status = status;

    // Check if all services are completed/cancelled to update booking status
    const allServicesCompleted = booking.services.every(service => 
      service.status === 'completed' || service.status === 'cancelled'
    );

    if (allServicesCompleted) {
      booking.status = 'completed';
    }

    // Save the updated booking
    const updatedBooking = await booking.save();

    res.json({
      success: true,
      message: "Service status updated successfully",
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Error updating service status:', error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
});

module.exports = router;