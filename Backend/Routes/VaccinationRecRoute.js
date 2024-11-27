const express = require("express");
const router = express.Router();

const VaccinationRecordController= require("../Controllers/VaccinationRecController");

router.get("/",VaccinationRecordController.getAllVaccineRecords);
router.post("/",VaccinationRecordController.addVaccineRecords);
router.get("/:id",VaccinationRecordController.getByVaccinationId);
router.put("/:id",VaccinationRecordController.updateVaccinationRecord);
router.delete("/:id",VaccinationRecordController.deleteVaccinationRecord);
router.get("/microchipId/:microchipId",VaccinationRecordController.getVaccinationRecordsByMicrochipId);

module.exports = router;