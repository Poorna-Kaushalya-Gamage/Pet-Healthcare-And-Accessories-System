const Delivery = require("../Model/DeliveryModel");

//data display
const getAllDelivery = async (req, res, next)=>{

    let delivery;

    try{
        delivery = await Delivery.find();
    }catch(err){
        console.log(err);
    }
    //not found users
    if(!delivery){
        return res.status(404).json({message:"delivery not found"});
    }
    //Display all users
    return res.status(200).json({delivery});
};

//data Insert
const addDelivery = async(req,res,next)=>{

    const {packageId,email,address,packSize,weight,delman,delservice} = req.body;

    let delivery;

    try{
        delivery = new Delivery({packageId,email,address,packSize,weight,delman,delservice});
        await delivery.save();
    }catch(err){
        console.log(err);
    }
    //don't insert users
    if(!Delivery){
        return res.status(404).json({message:"unable to add delivery"})
    }
    return res.status(200).json({delivery});
};
//Get by Id
const getById = async(req,res,next)=>{

    const id = req.params.id;

    let delivery;

    try{
        delivery = await Delivery.findById(id);
    }catch(err){
        console.log(err);
                 
    }
    
    //not available users
    if(!Delivery){
        return res.status(404).json({message:"User not found"})
    }
    return res.status(200).json({delivery});

}

//update delivery Details
const updateDelivery = async(req,res,next)=>{

    const id = req.params.id;
    const {packageId,email,address,packSize,weight,delman,delservice}=req.body;

    let delivery;

    try{
        delivery = await Delivery.findByIdAndUpdate(id,
            {packageId:packageId,email:email,address:address,packSize:packSize,weight:weight,delman:delman,delservice:delservice,
                });
            delivery = await Delivery.save();
    }catch(err){
        console.log(err);    
    }
    if(!Delivery){
        return res.status(404).json({message:"unable to update user details"})
    }
    return res.status(200).json({delivery});

};

//delete delivery details 
const deleteDelivery = async(req,res,next)=>{

    const id = req.params.id;
   

    let delivery;

    try{
        delivery = await Delivery.findByIdAndDelete(id)
           
    }catch(err){
        console.log(err);    
    }
    if(!Delivery){
        return res.status(404).json({message:"unable to delete user details"})
    }
    return res.status(200).json({delivery});

};


exports.getAllDelivery = getAllDelivery;
exports.addDelivery = addDelivery;
exports.getById = getById;
exports.updateDelivery = updateDelivery;
exports.deleteDelivery = deleteDelivery;