const express = require("express");
const { listIssueCategories, submitIssue } = require("../controllers/issues.controller");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/categories", listIssueCategories);
router.post("/report", protect, submitIssue);

module.exports = router;
