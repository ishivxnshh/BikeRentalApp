const Earning = require("../models/Earning");

async function getEarnings(req, res) {
  try {
    const { userId } = req.params;
    let earning = await Earning.findOne({ userId });

    if (!earning) {
      earning = await Earning.create({
        userId,
        totalEarnings: 0,
        workingDays: 0,
        totalOrders: 0,
        walletBalance: 0,
      });
    }

    const { totalEarnings, workingDays, totalOrders, walletBalance } = earning;
    res.json({ totalEarnings, workingDays, totalOrders, walletBalance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getEarnings };
