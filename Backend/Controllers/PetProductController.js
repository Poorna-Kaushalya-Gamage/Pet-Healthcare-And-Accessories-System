const product = require("../Model/PetProductModel");
//data display
const getAllproducts = async(req, res, next) =>{

    let products;

    try{
        products = await product.find();
    }catch (err){
        console.log(err);
    }
    //not found
    if(!products){
        return res.status(404).json({message:"Product not found"});
    }
    //Display all products
    return res.status(200).json({products});

};

//data insert
const addproducts = async (req, res, next) =>{

    const {ppid,name,image, description, price, quantity, manufactureDate,expireDate, stockAlertThreshold, reorderPoint, category, brand} = req.body;

    let products;

    try{
        products = new product({ppid,name,image, description, price, quantity, manufactureDate,expireDate, stockAlertThreshold, reorderPoint, category, brand});
        await products.save();
    } catch (err){
        console.log(err);
    }

    //not insert products
    if(!products){
        return res.status(404).send({message: "unable to add products"});
    }
    return res.status(200).json({products})
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let products;

    try{
        products = await product.findById(id);
    }catch(err){
        console.log(err);

    }
// not available products
    if(!products){
        return res.status(404).send({message: "product not found"});
    }
    return res.status(200).json({products})
};

//update product details
const updateProduct = async (req, res, next) =>{

    const id = req.params.id;
    const {ppid,name,image, description, price, quantity, manufactureDate,expireDate, stockAlertThreshold, reorderPoint, category, brand} = req.body;

    let products;

    try{
        products = await product.findByIdAndUpdate(id, {ppid:ppid, name: name, image:image, description: description, price: price, quantity:quantity, manufactureDate:manufactureDate, expireDate:expireDate, stockAlertThreshold: stockAlertThreshold, reorderPoint: reorderPoint, 
        category: category, brand:brand});
        products = await products.save();
    } catch(err){
        console.log(err);
    }

    //not update product
    if(!products){
        return res.status(404).send({message: "product not update"});
    }
    return res.status(200).json({products})

};

//Delete product details
const deleteProduct = async (req, res, next) =>{

    const id = req.params.id;

    let products;

    try{
        products = await product.findByIdAndDelete(id);
    }catch (err){

        console.log(err);
    }

    //not delete product
    if(!products){
        return res.status(404).send({message: "product not delete"});
    }
    return res.status(200).json({products})

};






exports.getAllproducts = getAllproducts;
exports.addproducts = addproducts;
exports.getById = getById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;


