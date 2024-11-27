const express = require("express");
const router = express.Router();

const CalorieCalcController = require("../Controllers/CalorieCalcController")

router.get("/",CalorieCalcController.getAllCaloriecalc);
router.post("/",CalorieCalcController.addCaloriecalc);
router.get("/:id",CalorieCalcController.getByCaloriecalcId);
router.put("/:id",CalorieCalcController.updateCaloriecalcRecord);
router.delete("/:id",CalorieCalcController.deleteCaloriecalcRecord);
router.get("/microchipId/:microchipId",CalorieCalcController.getCaloriecalcRecordsByMicrochipId);

module.exports = router;