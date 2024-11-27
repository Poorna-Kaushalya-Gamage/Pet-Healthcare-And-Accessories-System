// DisplayOtpRoute.js
const express = require("express");
const router = express.Router();
const DisplayDataControl = require("../Controllers/Display data control");

router.post("/", DisplayDataControl.addotp);
router.post("/verify", DisplayDataControl.loginotp); 

module.exports = router;
