const Vehicle = require("../models/Vehicle");

async function listVehicleLocations(req, res) {
  try {
    const vehicles = await Vehicle.find({}, "_id lastLocation status batteryPercent");
    const locations = vehicles.map(v => ({
      id: v._id,
      lat: v.lastLocation?.lat,
      lng: v.lastLocation?.lng,
      status: v.status,
      batteryPercent: v.batteryPercent
    }));
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listVehicleLocations };
