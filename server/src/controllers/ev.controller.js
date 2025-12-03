const EV = require("../models/EV");

async function listEVs(req, res) {
  try {
    const evs = await EV.find();
    res.json(evs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listEVs };
