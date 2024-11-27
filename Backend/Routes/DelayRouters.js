const express = require("express");
const router3 = express.Router();
//Insert Model
const Delay = require("../Model/DelayModel");
//Insert User Controller
const DelayController = require("../Controllers/DelayControlers");

router3.get("/",DelayController.getAllDelay);
router3.post("/",DelayController.addDelay);
router3.get("/:id",DelayController.getById);
router3.put("/:id",DelayController.updateDelay);
router3.delete("/:id",DelayController.deleteDelay);



module.exports = router3;