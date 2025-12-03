const express = require("express");
const { listVehicleLocations } = require("../controllers/map.controller");
const router = express.Router();

router.get("/vehicles", listVehicleLocations);

module.exports = router;
