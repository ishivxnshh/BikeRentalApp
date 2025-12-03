const express = require("express");
const { registerUser, loginUser, updateProfile } = require("../controllers/auth.controller");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validation/authValidator");

const router = express.Router();

// Register route
router.post("/register", validate(registerSchema()), registerUser);

// Login route
router.post("/login", validate(loginSchema()), loginUser);

// Update profile route (protected)
router.put("/update-profile", protect, updateProfile);

module.exports = router;
