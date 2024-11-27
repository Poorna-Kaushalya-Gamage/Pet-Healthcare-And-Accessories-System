express = require("express");
const router = express.Router();

//insert model
const User = require("../Model/Display Data model");
const Pets = require("../Model/Pet Model");

//insert user controller
const Displaydatacontrol = require("../Controllers/Display data control");
const { model } = require("mongoose");

router.get("/",Displaydatacontrol.getAllUsers);
router.post("/",Displaydatacontrol.addusers);
router.get("/:id",Displaydatacontrol.getById);
router.put("/:id",Displaydatacontrol.updateuser);
router.delete("/:id",Displaydatacontrol.deleteuser);
router.post("/:email",Displaydatacontrol.loginuser);
router.get("/email/:email", Displaydatacontrol.getUserByEmail);

//export
module.exports = router;
