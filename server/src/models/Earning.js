const mongoose = require("mongoose");

const earningSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalEarnings: Number,
  workingDays: Number,
  totalOrders: Number,
  walletBalance: Number,
});

module.exports = mongoose.model("Earning", earningSchema);
