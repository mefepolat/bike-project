const express = require("express");
const { getBikes } = require("../controllers/bikes");
const router = express.Router();

router.get("/bikes", getBikes);

module.exports = router;
