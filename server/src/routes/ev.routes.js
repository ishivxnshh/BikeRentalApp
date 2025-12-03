const express = require("express");
const { listEVs } = require("../controllers/ev.controller");
const router = express.Router();

router.get("/list", listEVs);

module.exports = router;
