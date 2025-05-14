const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Room = require("../models/Room"); 
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");
const { checkoutBooking } = require('../controllers/bookingController');


router.post("/api/bookings", async (req, res) => {
  const { userId, roomId, checkInDate, checkOutDate, adults, children } = req.body;

  try {
    console.log("🔍 Booking Request Received:");
    console.log("➡️ userId:", userId);
    console.log("➡️ roomId:", roomId);
    console.log("➡️ checkInDate:", checkInDate);
    console.log("➡️ checkOutDate:", checkOutDate);

    if (!roomId) {
      return res.status(400).json({ error: "Room ID is missing in request." });
    }

   
    const existingBooking = await Booking.findOne({
      room: roomId,
      $or: [
        { checkInDate: { $lt: new Date(checkOutDate) }, checkOutDate: { $gt: new Date(checkInDate) } }
      ],
    });

    console.log("🔍 Existing Booking Found:", existingBooking);

    if (existingBooking) {
      return res.status(400).json({ error: "Room is already booked for the selected dates." });
    }


    const booking = new Booking({
      user: userId,
      room: roomId,
      checkInDate,
      checkOutDate,
      adults,
      children,
    });

    await booking.save();
    console.log("✅ Booking Successful:", booking);

    res.status(201).json(booking);
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({ error: "Server error" });
  }
});





router.get("/api/bookingdata", async (req, res) => {
  try {
 
    const bookings = await Booking.find({ status: "pending" })
      .populate("room")
      .exec();

      


    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/bookingsuser", authenticateUser, async (req, res) => {
  try {
   
    const bookingsdata = await Booking.find({ 
      user: req.user._id,  
      deletedAt: { $exists: false }
    })
    .populate("room")
    .sort({ createdAt: -1 }) 
    .exec();

    res.status(200).json(bookingsdata);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});



router.put("/bookingdata/:id", async (req, res) => {
  const { status } = req.body;

  try {

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } 
    ).populate("user room");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("Booking before room update:", booking);

 
    if (status === "confirmed") {
      const updatedRoom = await Room.findByIdAndUpdate(
        booking.room._id,
        { status: "booked" },
        { new: true } 
      );

      console.log("Updated Room:", updatedRoom); 
    }

  
    if (status === "cancelled") {
      const updatedRoom = await Room.findByIdAndUpdate(
        booking.room._id,
        { status: "available" },
        { new: true }
      );

      console.log("Updated Room:", updatedRoom); 
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Server error" });
  }
});





router.put('/bookingsuser/:id', authenticateUser, async (req, res) => {
  try {

    const currentBooking = await Booking.findById(req.params.id);
    
    if (!currentBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }


    const updateData = {
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      adults: req.body.adults,
      children: req.body.children,
      status: 'pending'
    };

 
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true,
        runValidators: true, 
        overwrite: false 
      }
    ).populate('room');

    res.json(updatedBooking);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
});
router.delete('/bookingsuser/:id', authenticateUser, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', 
        deletedAt: new Date(Date.now() + 30000) 
      },
   
      { new: true }
    ).populate('room');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await Room.findByIdAndUpdate(booking.room._id, { status: 'available' });

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get("/bookingdata/checked-in", async (req, res) => {
  try {
   
    const bookings = await Booking.find({ status: "confirmed" })
      .populate({
        path: "room",
     
        select: "roomNumber type price status"
      })
      .populate({
        path: "user",

        select: "name email"
      })
      .exec();

  
    const filteredBookings = bookings.filter(
      booking => booking.room && booking.room.status === "checked-in"
    );

    res.status(200).json(filteredBookings);
  } catch (error) {
    console.error("Error fetching checked-in bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/bookingsuser/:id/checkout", authenticateUser, checkoutBooking);

router.get('/bookingdata/checked-out', async (req, res) => {
  try {
    const bookings = await Booking.find({ status: 'checked-out' })
      .populate('user', 'name') 
      .populate('room', 'roomNumber type status'); 

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching checked-out bookings:", err);
    res.status(500).json({ message: 'Server error while fetching checked-out bookings' });
  }
});




router.put("/bookingdata/:id/staff", async (req, res) => {
  try {
    const { staffName } = req.body;
    
    if (!staffName) {
      return res.status(400).json({ message: "Staff name is required" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { staffName },
      { new: true }
    ).populate("user").populate("room");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error("Error updating staff name:", error);
    res.status(500).json({ message: "Server error" });
  }
});





router.get('/staff-counts', authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const staffCounts = await Booking.aggregate([
      {
        $group: {
          _id: "$staffName",
          total: { $sum: 1 },
          confirmed: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] 
            } 
          },
          checkedIn: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "checked-in"] }, 1, 0] 
            } 
          },
          checkedOut: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "checked-out"] }, 1, 0] 
            } 
          },
          cancelled: { 
            $sum: { 
              $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] 
            } 
          }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json(staffCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;