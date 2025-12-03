const express = require("express");

const {
  submitAadhaar,
  submitPAN,
  submitDL,
  submitBankDetails,
  getOnboardingStatus,
  updateOverallStatus,
} = require("../controllers/onboarding.controller");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const validate = require("../middleware/validate");
const aadhaarSchema = require("../validation/aadhaarValidator");
const panSchema = require("../validation/panValidator");
const dlSchema = require("../validation/dlValidator");
const bankSchema = require("../validation/bankValidator");

const router = express.Router();


// POST /aadhaar
router.post("/aadhaar", protect, upload.single("image"), validate(aadhaarSchema()), submitAadhaar);

// POST /pan
router.post("/pan", protect, upload.single("image"), validate(panSchema()), submitPAN);

// POST /dl
router.post("/dl", protect, upload.single("image"), validate(dlSchema()), submitDL);

// POST /bank
router.post("/bank", protect, upload.single("image"), validate(bankSchema()), submitBankDetails);

// GET /status/:userId (public)
router.get("/status/:userId", async (req, res) => {
  req.query.userId = req.params.userId;
  await getOnboardingStatus(req, res);
});

// PATCH /update-status/:userId
router.patch("/update-status/:userId", protect, async (req, res) => {
  req.body.userId = req.params.userId;
  await updateOverallStatus(req, res);
});

module.exports = router;
