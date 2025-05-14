const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");


router.post("/", notificationController.createNotification);


router.get("/", notificationController.getAllNotifications);

// ✅ Get notifications for a specific user
router.get("/:userId", notificationController.getUserNotifications);

// ✅ Mark a notification as read
router.put("/:id", notificationController.markAsRead);

// ✅ Delete a notification
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;