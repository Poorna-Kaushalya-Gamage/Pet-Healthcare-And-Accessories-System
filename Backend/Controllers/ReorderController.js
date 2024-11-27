const reorder = require("../Model/ReorderModel");
//data display
const getAllreorders = async(req, res, next) =>{

    let reorders;

    try{
        reorders = await reorder.find();
    }catch (err){
        console.log(err);
    }
    //not found
    if(!reorders){
        return res.status(404).json({message:"reorder not found"});
    }
    //Display all reorders
    return res.status(200).json({reorders});

};

//data insert
const addreorders = async (req, res, next) =>{

    const {prid,name, reorderQuantity, supplierName, supplierNo} = req.body;

    let reorders;

    try{
        reorders = new reorder({prid,prid,name, reorderQuantity, supplierName, supplierNo});
        await reorders.save();
    } catch (err){
        console.log(err);
    }

    //not insert reorders
    if(!reorders){
        return res.status(404).send({message: "unable to add reorders"});
    }
    return res.status(200).json({reorders})
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let reorders;

    try{
        reorders = await reorder.findById(id);
    }catch(err){
        console.log(err);

    }
// not available reorders
    if(!reorders){
        return res.status(404).send({message: "reorder not found"});
    }
    return res.status(200).json({reorders})
};

//update reorder details
const updateReorder = async (req, res, next) =>{

    const id = req.params.id;
    const {prid,name, reorderQuantity, supplierName, supplierNo} = req.body;

    let reorders;

    try{
        reorders = await reorder.findByIdAndUpdate(id, {prid:prid, name:name, reorderQuantity:reorderQuantity, supplierName:supplierName, supplierNo:supplierNo});
        reorders = await reorders.save();
    } catch(err){
        console.log(err);
    }

    //not update reorder
    if(!reorders){
        return res.status(404).send({message: "reorder not update"});
    }
    return res.status(200).json({reorders})

};

//Delete reorder details
const deleteReorder = async (req, res, next) =>{

    const id = req.params.id;

    let reorders;

    try{
        reorders = await reorder.findByIdAndDelete(id);
    }catch (err){

        console.log(err);
    }

    //not delete reorders
    if(!reorders){
        return res.status(404).send({message: "reorder not delete"});
    }
    return res.status(200).json({reorders})

};

exports.getAllreorders=getAllreorders;
exports.addreorders=addreorders;
exports.getById=getById;
exports.updateReorder=updateReorder;
exports.deleteReorder=deleteReorder;