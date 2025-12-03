const Vehicle = require("../models/Vehicle");

// 1️⃣ List Vehicles
async function listVehicles(req, res) {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    const vehicles = await Vehicle.find(filter);
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 2️⃣ Update Vehicle Status
async function updateVehicleStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, batteryPercent, speed, range } = req.body;
    const update = {};
    if (status) update.status = status;
    if (batteryPercent !== undefined) update.batteryPercent = batteryPercent;
    if (speed !== undefined) update.speed = speed;
    if (range !== undefined) update.range = range;
    const vehicle = await Vehicle.findByIdAndUpdate(id, update, { new: true });
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 3️⃣ Update Vehicle Location
async function updateVehicleLocation(req, res) {
  try {
    const { id } = req.params;
    const { lat, lng } = req.body;
    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ error: "lat and lng are required" });
    }
    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { lastLocation: { lat, lng } },
      { new: true }
    );
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 4️⃣ Get Vehicle Details
async function getVehicleDetails(req, res) {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 5️⃣ Send Vehicle Command
async function sendVehicleCommand(req, res) {
  try {
    const { id } = req.params;
    const { command } = req.body;
    const allowed = ["ignition_on", "ignition_off", "lock", "unlock"];
    if (!allowed.includes(command)) {
      return res.status(400).json({ error: "Invalid command" });
    }
    // Simulate command
    res.json({ success: true, command });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listVehicles,
  updateVehicleStatus,
  updateVehicleLocation,
  getVehicleDetails,
  sendVehicleCommand,
};
