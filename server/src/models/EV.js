const mongoose = require("mongoose");

const evSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speed: Number,
  batteryPercent: Number,
  rentalRange: Number,
  chargingStatus: { type: String, enum: ["charging", "idle", "full"] },
  imageUrl: String,
});

module.exports = mongoose.model("EV", evSchema);
