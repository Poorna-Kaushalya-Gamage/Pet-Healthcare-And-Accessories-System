const express = require("express");
const rerouter = express.Router();

//Insert Model
const reorder = require("../Model/ReorderModel");

//Insert reorder Controller
const ReorderController = require("../Controllers/ReorderController");

rerouter.get("/getAll",ReorderController.getAllreorders);
rerouter.post("/add",ReorderController.addreorders);
rerouter.get("/:id",ReorderController.getById);
rerouter.put("/:id",ReorderController.updateReorder);
rerouter.delete("/:id",ReorderController.deleteReorder);

module.exports=rerouter;

