const Onboarding = require("../models/Onboarding");
const { uploadToCloudinary } = require("../config/cloudinary");

// 1️⃣ Submit Aadhaar
async function submitAadhaar(req, res) {
  try {
    const { userId, aadhaarNumber } = req.body;
    if (!userId || !aadhaarNumber) {
      return res.status(400).json({ error: "userId and aadhaarNumber are required" });
    }
    let onboarding = await Onboarding.findOne({ userId });
    if (!onboarding) {
      onboarding = new Onboarding({ userId });
    }
    onboarding.aadhaarNumber = aadhaarNumber;
    onboarding.aadhaarVerified = false;

    // Handle image upload if file exists
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'kyc-documents/aadhaar');
      onboarding.aadhaarImageUrl = uploadResult.secure_url;
    }

    await onboarding.save();
    res.json(onboarding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 2️⃣ Submit PAN
async function submitPAN(req, res) {
  try {
    const { userId, panNumber } = req.body;
    if (!userId || !panNumber) {
      return res.status(400).json({ error: "userId and panNumber are required" });
    }
    let onboarding = await Onboarding.findOne({ userId });
    if (!onboarding) {
      onboarding = new Onboarding({ userId });
    }
    onboarding.panNumber = panNumber;
    onboarding.panVerified = false;

    // Handle image upload if file exists
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'kyc-documents/pan');
      onboarding.panImageUrl = uploadResult.secure_url;
    }

    await onboarding.save();
    res.json(onboarding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 3️⃣ Submit DL
async function submitDL(req, res) {
  try {
    const { userId, dlNumber } = req.body;
    if (!userId || !dlNumber) {
      return res.status(400).json({ error: "userId and dlNumber are required" });
    }
    let onboarding = await Onboarding.findOne({ userId });
    if (!onboarding) {
      onboarding = new Onboarding({ userId });
    }
    onboarding.dlNumber = dlNumber;
    onboarding.dlVerified = false;

    // Handle image upload if file exists
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'kyc-documents/dl');
      onboarding.dlImageUrl = uploadResult.secure_url;
    }

    await onboarding.save();
    res.json(onboarding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 4️⃣ Submit Bank Details
async function submitBankDetails(req, res) {
  try {
    const { userId, bankAccount, ifscCode } = req.body;
    if (!userId || !bankAccount || !ifscCode) {
      return res.status(400).json({ error: "userId, bankAccount, and ifscCode are required" });
    }
    let onboarding = await Onboarding.findOne({ userId });
    if (!onboarding) {
      onboarding = new Onboarding({ userId });
    }
    onboarding.bankAccount = bankAccount;
    onboarding.ifscCode = ifscCode;
    onboarding.bankVerified = false;

    // Handle image upload if file exists
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'kyc-documents/bank');
      onboarding.bankImageUrl = uploadResult.secure_url;
    }

    await onboarding.save();
    res.json(onboarding);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 5️⃣ Get Onboarding Status
async function getOnboardingStatus(req, res) {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    const onboarding = await Onboarding.findOne({ userId });
    if (!onboarding) {
      return res.status(404).json({ error: "Onboarding record not found" });
    }
    const {
      aadhaarVerified,
      panVerified,
      dlVerified,
      bankVerified,
      onboardingStatus,
    } = onboarding;
    res.json({
      aadhaarVerified,
      panVerified,
      dlVerified,
      bankVerified,
      onboardingStatus,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 6️⃣ Update Overall Status
async function updateOverallStatus(req, res) {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    let onboarding = await Onboarding.findOne({ userId });
    if (!onboarding) {
      onboarding = new Onboarding({ userId });
    }
    const {
      aadhaarVerified = false,
      panVerified = false,
      dlVerified = false,
      bankVerified = false,
    } = onboarding;
    if (aadhaarVerified && panVerified && dlVerified && bankVerified) {
      onboarding.onboardingStatus = "verified";
    } else if (
      onboarding.aadhaarNumber ||
      onboarding.panNumber ||
      onboarding.dlNumber ||
      onboarding.bankAccount
    ) {
      onboarding.onboardingStatus = "in_progress";
    } else {
      onboarding.onboardingStatus = "pending";
    }
    await onboarding.save();
    res.json({ onboardingStatus: onboarding.onboardingStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  submitAadhaar,
  submitPAN,
  submitDL,
  submitBankDetails,
  getOnboardingStatus,
  updateOverallStatus,
};
