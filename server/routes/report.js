const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/CatchAsync");
const { createReport } = require("../controllers/report");
const { isLoggedIn } = require("../middleware.js");

router.post("/create-report", isLoggedIn,  catchAsync(createReport));

module.exports = router;