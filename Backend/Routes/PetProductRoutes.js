const express = require("express");
const router = express.Router();
//Insert Model
const product = require("../Model/PetProductModel");
//Insert product Controller
const PetProductController = require("../Controllers/PetProductController");

router.get("/getAll",PetProductController.getAllproducts);
router.post("/add",PetProductController.addproducts);
router.get("/:id",PetProductController.getById);
router.put("/:id",PetProductController.updateProduct);
router.delete("/:id",PetProductController.deleteProduct);



module.exports = router;
