const express = require("express");
const router = express.Router();
const { getTrips } = require("../controllers/trips");
const { isLoggedIn } = require("../middleware");

router.get("/trips", isLoggedIn, getTrips);

module.exports = router;
