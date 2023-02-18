const express = require("express");
const router = express.Router();
const { postTrip, endTrip, checkTripStatus } = require("../controllers/trips");
const catchAsync = require("../utils/CatchAsync");

router.post("/newTrip", catchAsync(postTrip));
router.patch("/endtrip", catchAsync(endTrip));
router.post("/status", catchAsync(checkTripStatus));

module.exports = router;
