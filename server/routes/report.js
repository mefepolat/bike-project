const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const {createReport} = require('../controllers/report');

router.route('/create-report')
.post(catchAsync(createReport));

module.exports = router;


