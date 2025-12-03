const express = require("express");
const { listPlans } = require("../controllers/rentalPlans.controller");
const router = express.Router();

router.get("/", listPlans);

module.exports = router;
