const express = require('express');
const router = express.Router();
const {postTrip, endTrip} = require('../controllers/trips');
const catchAsync = require('../utils/CatchAsync');

router.post('/newTrip', catchAsync(postTrip));
router.patch('/endtrip/:tripId', catchAsync(endTrip));

module.exports = router;