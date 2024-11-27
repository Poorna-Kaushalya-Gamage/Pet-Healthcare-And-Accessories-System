const express = require("express");
const router = express.Router();
// Insert Model
const PetRecordBook = require("../Model/PetRecordBookModel");
// Insert pet record controller
const PetRecordBookController = require("../Controllers/PetRecordBookController"); 

router.get("/",PetRecordBookController.getAllPetRecordBooks);
router.post("/",PetRecordBookController.addPetHealthRecords);
router.get("/:id",PetRecordBookController.getById);
router.put("/:id",PetRecordBookController.updateHealthRecord);
router.delete("/:id",PetRecordBookController.deleteHealthRecord);
router.get("/microchipId/:microchipId",PetRecordBookController.getPetRecordsByMicrochipId);

// export
module.exports = router;