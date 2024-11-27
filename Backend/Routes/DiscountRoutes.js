const express = require("express");
const disrouter = express.Router();

//Insert Model
const discount = require("../Model/DiscountModel");

//Insert discount Controller
const DiscountController = require("../Controllers/DiscountController");

disrouter.get("/getAll",DiscountController.getAlldiscounts);
disrouter.post("/add",DiscountController.adddiscounts);
disrouter.get("/:id",DiscountController.getById);
disrouter.put("/:id",DiscountController.updateDiscount);
disrouter.delete("/:id",DiscountController.deleteDiscount);



module.exports = disrouter;