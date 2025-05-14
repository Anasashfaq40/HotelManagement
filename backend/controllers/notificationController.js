const Notification = require("../models/Notification");

// ✅ Create a Notification
exports.createNotification = async (req, res) => {
  try {
    const { user, message, type, isRead } = req.body;
    const newNotification = new Notification({ user, message, type, isRead: isRead || false });
    await newNotification.save();
    res.status(201).json({ message: "Notification created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Notifications (For Admin)
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate("user");
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Notifications for a Specific User
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Mark a Notification as Read
exports.markAsRead = async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a Notification
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};