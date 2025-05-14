const Room = require("../models/Room");

exports.addRoom = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // ✅ Debugging
        
        const { roomNumber, type, price, status } = req.body;
        console.log("Received Status:", status); // ✅ Check status value
        
        const image = req.file ? req.file.filename : "";
        const newRoom = new Room({ roomNumber, type, price, status, image });
        await newRoom.save();
        
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        console.log("Update Request Body:", req.body); // ✅ Debugging
        
        const { roomNumber, type, price, status } = req.body;
        console.log("Received Status in Update:", status); // ✅ Check status
        
        const updates = { roomNumber, type, price, status };

        if (req.file) updates.image = req.file.filename;

        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        if (!updatedRoom) {
            return res.status(404).json({ error: "Room not found" });
        }

        res.json(updatedRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




exports.deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
