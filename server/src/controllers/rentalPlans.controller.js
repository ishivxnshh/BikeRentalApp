const RentalPlan = require("../models/RentalPlan");

async function listPlans(req, res) {
  try {
    const plans = await RentalPlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listPlans };
