const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Booking = require('../models/Booking');
const Invoice = require('../models/Invoice');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/generate/:bookingId', authenticateUser, async (req, res) => {
  try {
 
    const booking = await Booking.findById(req.params.bookingId)
      .populate({
        path: 'user',
        select: 'name email contact'
      })
      .populate({
        path: 'room',
        select: 'roomNumber type price'
      })
      .populate({
        path: 'serviceBookings',
        populate: [{
          path: 'services.service',
          model: 'Service',
          select: 'name price'
        }, {
          path: 'guest',
          model: 'User',
          select: 'name'
        }]
      });

    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: 'Booking not found' 
      });
    }

    console.log('Service bookings found:', booking.serviceBookings);


    const nights = Math.ceil(
      (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / 
      (1000 * 60 * 60 * 24)
    );
    const roomSubtotal = nights * booking.room.price;


    const serviceCharges = [];
    let servicesSubtotal = 0;

    if (booking.serviceBookings && booking.serviceBookings.length > 0) {
      for (const serviceBooking of booking.serviceBookings) {
        if (serviceBooking.services && serviceBooking.services.length > 0) {
          for (const serviceItem of serviceBooking.services) {
            try {
      
              const service = serviceItem.service || {};
              const quantity = serviceItem.quantity || 1;
              const unitPrice = serviceItem.priceAtBooking || service.price || 0;
              const serviceTotal = unitPrice * quantity;
              
              servicesSubtotal += serviceTotal;
              serviceCharges.push({
                name: service.name || 'Service',
                quantity: quantity,
                unitPrice: unitPrice,
                total: serviceTotal,
                status: serviceItem.status || 'completed'
              });
            } catch (err) {
              console.error('Error processing service:', err);
            }
          }
        }
      }
    }

 
    const invoiceData = {
      invoiceNumber: `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      booking: booking._id,
      user: booking.user?._id,
      guestDetails: {
        name: booking.user?.name || 'Guest',
        email: booking.user?.email || '',
        contact: booking.user?.contact || ''
      },
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      roomCharges: {
        roomNumber: booking.room?.roomNumber || '',
        roomType: booking.room?.type || '',
        ratePerNight: booking.room?.price || 0,
        nights: nights,
        subtotal: roomSubtotal
      },
      serviceCharges: serviceCharges,
      tax: {
        rate: 0.15,
        amount: (roomSubtotal + servicesSubtotal) * 0.15
      },
      totalAmount: roomSubtotal + servicesSubtotal + (roomSubtotal + servicesSubtotal) * 0.15,
      status: 'paid',
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate
    };

    const invoice = new Invoice(invoiceData);
    await invoice.save();
    
    // Update booking with invoice reference
    booking.invoice = invoice._id;
    booking.status = 'checked-out';
    booking.paymentStatus = 'paid';
    await booking.save();

    return res.json({
      success: true,
      data: invoiceData,
      message: 'Invoice generated successfully'
    });

  } catch (error) {
    console.error('Invoice generation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating invoice',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;