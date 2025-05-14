const GuestServiceBooking = require('../models/GuestServiceBooking');
const Booking = require('../models/Booking');
const Service = require('../models/Service');

// exports.createServiceBooking = async (req, res) => {
//   try {
//     const { booking, services, totalServiceAmount } = req.body;
    
  
//     const activeBooking = await Booking.findById(booking);
//     if (!activeBooking || !['confirmed', 'checked-in'].includes(activeBooking.status)) {
//       return res.status(400).json({ message: 'No active booking found' });
//     }

//     for (const item of services) {
//       const service = await Service.findById(item.service);
//       if (!service || !service.isActive) {
//         return res.status(400).json({ message: `Service ${item.service} not available` });
//       }
      
//       if (service.requiresTimeSlot && !item.scheduledTime) {
//         return res.status(400).json({ message: 'Scheduled time required for this service' });
//       }
//     }
    
  
//     let serviceBooking = await GuestServiceBooking.findOne({ 
//       guest: req.user._id,
//       booking: booking,
//       status: 'active'
//     });
    
//     if (serviceBooking) {

//       serviceBooking.services.push(...services);
//       serviceBooking.totalServiceAmount += totalServiceAmount;
//     } else {

//       serviceBooking = new GuestServiceBooking({
//         guest: req.user._id,
//         booking,
//         services,
//         totalServiceAmount
//       });
//     }
    
//     await serviceBooking.save();
    
  
//     const populatedBooking = await GuestServiceBooking.findById(serviceBooking._id)
//       .populate('guest', 'name email')
//       .populate('services.service', 'name price');
    
//     res.status(201).json(populatedBooking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createServiceBooking = async (req, res) => {
//   try {
//     const { booking, services } = req.body;
    
//     // Validate active booking
//     const activeBooking = await Booking.findById(booking);
//     if (!activeBooking || !['confirmed', 'checked-in'].includes(activeBooking.status)) {
//       return res.status(400).json({ message: 'No active booking found' });
//     }
    
//     // Validate services and get current prices
//     const validatedServices = await Promise.all(services.map(async (item) => {
//       const service = await Service.findById(item.service);
//       if (!service || !service.isActive) {
//         throw new Error(`Service ${item.service} not available`);
//       }
      
//       if (service.requiresTimeSlot && !item.scheduledTime) {
//         throw new Error('Scheduled time required for this service');
//       }
      
//       return {
//         ...item,
//         priceAtBooking: service.price // Store the price at booking time
//       };
//     }));

//     // Calculate total amount from non-cancelled services
//     const totalServiceAmount = validatedServices.reduce(
//       (sum, service) => sum + (service.priceAtBooking * service.quantity), 0);

//     // Check for existing service booking for this booking ID
//     let serviceBooking = await GuestServiceBooking.findOne({ 
//       guest: req.user._id,
//       booking: booking,
//       status: 'active'
//     }).populate('services.service');
    
//     if (serviceBooking) {
//       // Update existing booking - only add non-cancelled services
//       validatedServices.forEach(service => {
//         if (service.status !== 'cancelled') {
//           serviceBooking.services.push(service);
//           serviceBooking.totalServiceAmount += service.priceAtBooking * service.quantity;
//         }
//       });
//     } else {
//       // Create new booking
//       serviceBooking = new GuestServiceBooking({
//         guest: req.user._id,
//         booking,
//         services: validatedServices,
//         totalServiceAmount
//       });
//     }
    
//     await serviceBooking.save();
    
//     // Populate the response
//     const populatedBooking = await GuestServiceBooking.findById(serviceBooking._id)
//       .populate('guest', 'name email')
//       .populate('services.service', 'name price');
    
//     res.status(201).json(populatedBooking);
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: error.message,
//       error: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// };

exports.createServiceBooking = async (req, res) => {
  try {
    const { booking, services } = req.body;
    const userId = req.user._id;

    // Validate active booking
    const activeBooking = await Booking.findById(booking)
      .populate('room', 'price');
    
    if (!activeBooking || !['confirmed', 'checked-in'].includes(activeBooking.status)) {
      return res.status(400).json({ 
        success: false,
        message: 'No active booking found' 
      });
    }

    // Validate services and get current prices
    const validatedServices = await Promise.all(services.map(async (item) => {
      const service = await Service.findById(item.service);
      if (!service || !service.isActive) {
        throw new Error(`Service ${item.service} not available`);
      }
      
      if (service.requiresTimeSlot && !item.scheduledTime) {
        throw new Error('Scheduled time required for this service');
      }
      
      return {
        service: service._id,
        quantity: item.quantity || 1,
        scheduledTime: item.scheduledTime || null,
        specialInstructions: item.specialInstructions || '',
        status: 'confirmed',
        priceAtBooking: service.price // Store the price at booking time
      };
    }));

    // Calculate total amount
    const totalServiceAmount = validatedServices.reduce(
      (sum, service) => sum + (service.priceAtBooking * service.quantity), 0);

    // Create new service booking
    const serviceBooking = new GuestServiceBooking({
      guest: userId,
      booking: booking,
      services: validatedServices,
      totalServiceAmount,
      status: 'active'
    });

    // Save the service booking
    await serviceBooking.save();

    // Update the main booking record
    const updatedBooking = await Booking.findByIdAndUpdate(
      booking,
      { 
        $push: { serviceBookings: serviceBooking._id },
        $inc: { 
          serviceCharges: totalServiceAmount,
          totalAmount: totalServiceAmount + (totalServiceAmount * 0.15) // including tax
        }
      },
      { new: true }
    ).populate('serviceBookings');

    // Populate the response
    const populatedServiceBooking = await GuestServiceBooking.findById(serviceBooking._id)
      .populate('guest', 'name email')
      .populate('services.service', 'name price description');

    res.status(201).json({
      success: true,
      data: {
        serviceBooking: populatedServiceBooking,
        booking: updatedBooking
      },
      message: 'Service booking created successfully'
    });

  } catch (error) {
    console.error('Error creating service booking:', error);
    res.status(500).json({ 
      success: false,
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};







// exports.getUserServiceBookings = async (req, res) => {
//   try {
//     const bookings = await GuestServiceBooking.find({ guest: req.user._id })
//       .populate('booking')
//       .populate('services.service');
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// controllers/serviceBookingController.js
exports.getAllServiceBookings = async (req, res) => {
  try {
    const bookings = await GuestServiceBooking.find({ status: 'active' })
      .populate({
        path: 'guest',
        model: 'User', // Explicitly specify the model
        select: 'name email'
      })
      .populate({
        path: 'booking',
        select: 'roomNumber status',
        populate: [
          {
            path: 'room',
            select: 'roomNumber'
          },
          {
            path: 'user',
            model: 'User',
            select: 'name email'
          }
        ]
      })
      .populate('services.service', 'name price');
    
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};