const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const passport = require('passport');
const {registerUser, login, logout} = require('../controllers/user');

router.route('/signup')
.post(catchAsync(registerUser));

router.route('/login')
.post(login)

router.get('/logout', logout)

module.exports = router;