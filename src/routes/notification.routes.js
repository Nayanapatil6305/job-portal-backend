const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notification.controller");

// Create Notification
router.post("/create", notificationController.createNotification);

// Get All Notifications
router.get("/", notificationController.getAllNotifications);

// Get Notifications by User
router.get("/user/:user_id", notificationController.getNotificationsByUser);

// Mark as Read
router.put("/:id/read", notificationController.markAsRead);

// Delete Notification
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;