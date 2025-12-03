const express = require("express");
const {
  listVehicles,
  updateVehicleStatus,
  updateVehicleLocation,
  getVehicleDetails,
  sendVehicleCommand,
} = require("../controllers/vehicles.controller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: List all vehicles
router.get("/", listVehicles);

// Protected: Get vehicle details
router.get("/:id", protect, getVehicleDetails);

// Protected: Update vehicle status
router.patch("/:id/status", protect, updateVehicleStatus);

// Protected: Update vehicle location
router.patch("/:id/location", protect, updateVehicleLocation);

// Protected: Send vehicle command
router.post("/:id/command", protect, sendVehicleCommand);

module.exports = router;
