const Earning = require("../models/Earning");

async function getEarnings(req, res) {
  try {
    const { userId } = req.params;
    const earning = await Earning.findOne({ userId });
    if (!earning) return res.status(404).json({ error: "Earnings not found" });
    const { totalEarnings, workingDays, totalOrders, walletBalance } = earning;
    res.json({ totalEarnings, workingDays, totalOrders, walletBalance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getEarnings };
