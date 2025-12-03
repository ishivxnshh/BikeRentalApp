const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    aadhaarNumber: {
      type: String,
      trim: true,
    },
    aadhaarImageUrl: {
      type: String,
      trim: true,
    },
    panNumber: {
      type: String,
      trim: true,
    },
    panImageUrl: {
      type: String,
      trim: true,
    },
    dlNumber: {
      type: String,
      trim: true,
    },
    dlImageUrl: {
      type: String,
      trim: true,
    },
    bankAccount: {
      type: String,
      trim: true,
    },
    ifscCode: {
      type: String,
      trim: true,
    },
    bankImageUrl: {
      type: String,
      trim: true,
    },
    aadhaarVerified: {
      type: Boolean,
      default: false,
    },
    panVerified: {
      type: Boolean,
      default: false,
    },
    dlVerified: {
      type: Boolean,
      default: false,
    },
    bankVerified: {
      type: Boolean,
      default: false,
    },
    onboardingStatus: {
      type: String,
      enum: ["pending", "in_progress", "verified"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Onboarding", onboardingSchema);
