express = require("express");
const router = express.Router();

//insert model
const Employees = require("../Model/Admin Model");

//insert user controller
const Displaydatacontrol = require("../Controllers/Display data control");
const { model } = require("mongoose");

router.post("/",Displaydatacontrol.addemployee);
router.post("/:email",Displaydatacontrol.loginAdmin);
router.get("/",Displaydatacontrol.getAllEmployees);
router.get("/email/:email", Displaydatacontrol.getemployeesByEmail);
router.get("/:id",Displaydatacontrol.getByemployeesId);
router.put("/:id",Displaydatacontrol.updateemployees);
router.delete("/:id",Displaydatacontrol.deleteemployees);

//export
module.exports = router;