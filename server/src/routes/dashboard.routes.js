const express = require("express");
const { getEarnings } = require("../controllers/dashboard.controller");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/earnings/:userId", protect, getEarnings);

module.exports = router;
