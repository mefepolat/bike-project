const express = require('express');
const router = express.Router();
const {postTrip} = require('../controllers/trips');
const catchAsync = require('../utils/CatchAsync');

router.post('/newTrip', catchAsync(postTrip));

module.exports = router;