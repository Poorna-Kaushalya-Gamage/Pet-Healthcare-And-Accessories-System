const express = require("express");
const router = express.Router();
//Insert Model
const Delivery = require("../Model/DeliveryModel");
//Insert User Controller
const DeliveryController = require("../Controllers/DeliveryControlers");

router.get("/",DeliveryController.getAllDelivery);
router.post("/",DeliveryController.addDelivery);
router.get("/:id",DeliveryController.getById);
router.put("/:id",DeliveryController.updateDelivery);
router.delete("/:id",DeliveryController.deleteDelivery);





//export
module.exports = router;