const express = require("express");
const multer = require("multer");
const Room = require("../models/Room")
const { addRoom, updateRoom, getAllRooms, deleteRoom } = require("../controllers/roomController");
// const { authenticateUser } = require("../middleware/authMiddleware");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.get("/rooms", getAllRooms);
router.post("/rooms", upload.single("image"), addRoom);
router.put("/rooms/:id", upload.single("image"), updateRoom);
router.delete("/rooms/:id", deleteRoom);


router.get("/", async (req, res) => {
    try {
      const rooms = await Room.find(); // Sare rooms fetch karna
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  


// Get room details by ID
router.get("/api/roo/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error("Error fetching room details:", error);
    res.status(500).json({ error: "Server error" });
  }
});



// Confirm a room (set status to "booked")
router.put("/rooms/confirm/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { status: "booked" }, // Update status to "booked"
      { new: true } // Return the updated room
    );
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error confirming room", error });
  }
});

// Reject a room (set status to "rejected")
router.put("/rooms/reject/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" }, // Update status to "rejected"
      { new: true } // Return the updated room
    );
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error rejecting room", error });
  }
});

// Confirm a room (set status to "booked")
router.put("/rooms/checked-in/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { status: "checked-in" }, // Update status to "booked"
      { new: true } // Return the updated room
    );
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error confirming room", error });
  }
});

// Reject a room (set status to "rejected")
router.put("/rooms/checked-out/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { status: "checked-out" }, // Update status to "rejected"
      { new: true } // Return the updated room
    );
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error rejecting room", error });
  }
});



router.put('/rooms/:roomId/cleaning', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.roomId,
      { status: 'cleaning' },
      { new: true }
    );

    if (!room) return res.status(404).json({ message: 'Room not found' });

    res.json({ message: 'Room marked as cleaning', room });
  } catch (err) {
    console.error("Error updating room status:", err);
    res.status(500).json({ message: 'Server error while updating room status' });
  }
});


router.get("/rooms/cleaning", async (req, res) => {
  const rooms = await Room.find({ status: "cleaning" });
  res.json(rooms);
});



router.put('/rooms/:roomId/available', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.roomId,
      { status: 'available' },
      { new: true }
    );

    if (!room) return res.status(404).json({ message: 'Room not found' });

    res.json({ message: 'Room marked as available', room });
  } catch (err) {
    console.error("Error updating room status:", err);
    res.status(500).json({ message: 'Server error while updating room status' });
  }
});



// Update room status
router.put('/:roomNumber/status', async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const { status } = req.body;

    const room = await Room.findOneAndUpdate(
      { roomNumber },
      { status },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: `Room ${roomNumber} status updated to ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




// Get rooms with maintenance status
router.get('/maintenance',  async (req, res) => {
  try {
    const rooms = await Room.find({ status: "maintenance" });
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update room status
router.put('/:roomNumber/status',  async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const { status } = req.body;

    const room = await Room.findOneAndUpdate(
      { roomNumber },
      { 
        status,
        statusUpdatedAt: Date.now() // Track when status was last updated
      },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: `Room ${roomNumber} status updated to ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
