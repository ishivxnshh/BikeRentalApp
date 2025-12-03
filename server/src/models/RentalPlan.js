const mongoose = require("mongoose");

const rentalPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  speed: Number,
  range: Number,
  description: String,
});

module.exports = mongoose.model("RentalPlan", rentalPlanSchema);
