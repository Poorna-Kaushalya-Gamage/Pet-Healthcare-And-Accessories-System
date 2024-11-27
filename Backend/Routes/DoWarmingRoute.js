const express = require("express");
const router = express.Router();

const DoWarmingController = require("../Controllers/DoWarmingController");

router.get("/",DoWarmingController.getAllDoWarmingRecords);
router.post("/",DoWarmingController.addDoWarmingRecords);
router.get("/:id",DoWarmingController.getByDoWarmingId);
router.put("/:id",DoWarmingController.updateDoWarmingRecord);
router.delete("/:id",DoWarmingController.deleteDoWarmingRecord);
router.get("/microchipId/:microchipId", DoWarmingController.getDoWarmingRecordsByMicrochipId);


module.exports = router;