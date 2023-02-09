const express = require('express');
const router = express.Router();
const {getTrips} = require('../controllers/trips')


router.get('/trips', getTrips)


module.exports = router;