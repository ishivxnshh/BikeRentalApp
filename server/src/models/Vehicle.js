const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["2W", "L3", "L5"], required: true },
    speed: Number,
    range: Number,
    batteryPercent: Number,
    status: { type: String, enum: ["ON", "OFF", "MOVING"], default: "OFF" },
    lastLocation: {
      lat: Number,
      lng: Number,
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
