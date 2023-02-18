const express = require("express");
const router = express.Router();
const { postTrip, endTrip, checkTripStatus } = require("../controllers/trips");
const { isLoggedIn } = require("../middleware");
const catchAsync = require("../utils/CatchAsync");

router.post("/newTrip", isLoggedIn, catchAsync(postTrip));
router.patch("/endtrip", catchAsync(endTrip));
router.post("/status", catchAsync(checkTripStatus));

module.exports = router;
