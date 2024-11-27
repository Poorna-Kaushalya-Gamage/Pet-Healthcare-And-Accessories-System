express = require("express");
const router = express.Router();

//insert model
const Pets = require("../Model/Pet Model");

//insert user controller
const Displaydatacontrol = require("../Controllers/Display data control");
const { model } = require("mongoose");

router.post('/', Displaydatacontrol.addPet);
router.get("/",Displaydatacontrol.getAllPets);
router.put("/:id",Displaydatacontrol.updatepet);
router.get("/:id",Displaydatacontrol.getBypetId);
router.get("/microchipId/:microchipId",Displaydatacontrol.getPetsBymicrochipId);
router.delete("/:id",Displaydatacontrol.deletepet);
router.get("/owner/:email", Displaydatacontrol.getPetsByEmail);

//export
module.exports = router;
