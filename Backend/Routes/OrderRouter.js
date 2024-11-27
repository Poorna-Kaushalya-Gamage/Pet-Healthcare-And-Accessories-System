const express = require("express");
const router4 = express.Router();
//Insert Model
const Order = require("../Model/OrderModel");
//Insert User Controller
const OrderController = require("../Controllers/OrderControlers");

router4.get("/",OrderController.getAllOrder);
router4.post("/",OrderController.addOrder);
router4.get("/:id",OrderController.getById);
router4.put("/:id",OrderController.updateOrder);
router4.delete("/:id",OrderController.deleteOrder);



module.exports = router4;