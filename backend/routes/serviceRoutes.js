const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { authenticateUser } = require('../middleware/authMiddleware');
const {createServiceBooking, getAllServiceBookings } = require ("../controllers/serviceRequestController");
const GuestServiceBooking = require('../models/GuestServiceBooking');
const multer = require('multer');
const path = require('path');



// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/services
// @desc    Create new service
// @access  Private (Admin)
router.post('/', authenticateUser, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, startTime, endTime, isActive } = req.body;
    
    // Simple validation
    if (!name || !price) {
      return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    // Determine if this service requires time slots
    const requiresTimeSlot = ['Breakfast', 'Lunch', 'Dinner'].includes(name);

    const newService = new Service({
      name,
      description,
      price,
      availableTimes: requiresTimeSlot ? {
        start: startTime || '07:00',
        end: endTime || '22:00'
      } : null,
      requiresTimeSlot,
      image: req.file ? req.file.path : '',
      isActive: isActive !== false
    });

    const service = await newService.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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
router.get('/bookings', authenticateUser,getAllServiceBookings);



// router.put('/bookings/:id/update-status', authenticateUser, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { serviceIndex, status } = req.body;

  
//     if (serviceIndex === undefined || status === undefined) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Both serviceIndex and status are required' 
//       });
//     }

//     if (typeof serviceIndex !== 'number' || serviceIndex < 0) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'serviceIndex must be a positive number' 
//       });
//     }

   
//     const booking = await GuestServiceBooking.findById(id);
//     if (!booking) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Booking not found' 
//       });
//     }

 
//     if (serviceIndex >= booking.services.length) {
//       return res.status(400).json({ 
//         success: false,
//         message: `Invalid service index. Maximum allowed: ${booking.services.length - 1}` 
//       });
//     }


//     const validStatuses = ["requested", "confirmed", "in-progress", "completed", "cancelled"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ 
//         success: false,
//         message: `Invalid status. Allowed values: ${validStatuses.join(', ')}` 
//       });
//     }

 
//     const currentStatus = booking.services[serviceIndex].status;
//     const validTransitions = {
//       requested: ['confirmed', 'cancelled'],
//       confirmed: ['in-progress', 'cancelled'],
//       'in-progress': ['completed', 'cancelled'],
//       completed: [],
//       cancelled: []
//     };

//     if (!validTransitions[currentStatus].includes(status)) {
//       return res.status(400).json({ 
//         success: false,
//         message: `Invalid status transition from ${currentStatus} to ${status}` 
//       });
//     }

  
//     booking.services[serviceIndex].status = status;


//     const allCancelled = booking.services.every(s => s.status === 'cancelled');
//     const allCompleted = booking.services.every(s => 
//       ['completed', 'cancelled'].includes(s.status)
//     );

//     if (allCancelled) {
//       booking.status = 'cancelled';
//     } else if (allCompleted) {
//       booking.status = 'completed';
//     } else {
//       booking.status = 'active';
//     }

//     const updatedBooking = await booking.save();

//     res.json({ 
//       success: true,
//       booking: updatedBooking 
//     });

//   } catch (error) {
//     console.error('Error updating service status:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Internal server error',
//       error: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// });


router.put('/bookings/:id/update-status', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceIndex, status } = req.body;

    // Validate inputs
    if (serviceIndex === undefined || status === undefined) {
      return res.status(400).json({ 
        success: false,
        message: 'Both serviceIndex and status are required' 
      });
    }

    if (typeof serviceIndex !== 'number' || serviceIndex < 0) {
      return res.status(400).json({ 
        success: false,
        message: 'serviceIndex must be a positive number' 
      });
    }

    // Find booking with services populated
    const booking = await GuestServiceBooking.findById(id).populate('services.service');
    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: 'Booking not found' 
      });
    }

    // Validate service index
    if (serviceIndex >= booking.services.length) {
      return res.status(400).json({ 
        success: false,
        message: `Invalid service index. Maximum allowed: ${booking.services.length - 1}` 
      });
    }

    // Validate status
    const validStatuses = ["requested", "confirmed", "in-progress", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(', ')}` 
      });
    }

    // Check valid transitions
    const currentStatus = booking.services[serviceIndex].status;
    const validTransitions = {
      requested: ['confirmed', 'cancelled'],
      confirmed: ['in-progress', 'cancelled'],
      'in-progress': ['completed', 'cancelled'],
      completed: [],
      cancelled: []
    };

    if (!validTransitions[currentStatus].includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: `Invalid status transition from ${currentStatus} to ${status}` 
      });
    }

    // Update service status
    booking.services[serviceIndex].status = status;

    // Recalculate total from non-cancelled services using priceAtBooking
    booking.totalServiceAmount = booking.services.reduce((total, s) => {
      return s.status !== 'cancelled' ? total + (s.priceAtBooking * s.quantity) : total;
    }, 0);

    // Update booking status
    const allCancelled = booking.services.every(s => s.status === 'cancelled');
    const allCompleted = booking.services.every(s => 
      ['completed', 'cancelled'].includes(s.status)
    );

    booking.status = allCancelled ? 'cancelled' : 
                    allCompleted ? 'completed' : 'active';

    const updatedBooking = await booking.save();

    res.json({ 
      success: true,
      booking: updatedBooking 
    });

  } catch (error) {
    console.error('Error updating service status:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});



module.exports = router;