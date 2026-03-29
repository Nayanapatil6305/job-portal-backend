const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");

// Create Admin
router.post("/create", adminController.createAdmin);

// Get All Admins
router.get("/", adminController.getAllAdmins);

// Get Single Admin
router.get("/:id", adminController.getAdminById);

// Update Admin
router.put("/:id", adminController.updateAdmin);

// Delete Admin
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;