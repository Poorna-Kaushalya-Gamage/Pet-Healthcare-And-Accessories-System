const express = require("express");

const router1 = express.Router();
//Insert Model
const track = require("../Model/TrackingModel");
//Insert User Controller
const TrackingControler = require("../Controllers/TrackingControler");

router1.get("/", TrackingControler.getAllTracking);
router1.post("/", TrackingControler.addTracking);
router1.get("/:id",TrackingControler.getById);
router1.put("/:id", TrackingControler.updateTracking);
router1.delete("/:id", TrackingControler.deleteTracking);
router1.get("/email/:email", TrackingControler.getTrackingByEmail);

module.exports = router1;


