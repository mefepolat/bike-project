const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const {createReport} = require('../controllers/report');
const {isLoggedIn} = require('../middleware.js');

router
.post('/create-report', catchAsync(createReport));

module.exports = router;





//Any update will be fetched from the database and the user will be redirected to the home page