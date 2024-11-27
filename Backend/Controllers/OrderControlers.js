const Order = require("../Model/OrderModel");


//data display
const getAllOrder = async (req, res, next)=>{

    let order;

    try{
        order = await Order.find();
    }catch(err){
        console.log(err);
    }
    //not found users
    if(!order){
        return res.status(404).json({message:"delay forms not found"});
    }
    //Display all users
    return res.status(200).json({order});
};


const addOrder = async(req,res,next)=>{

    const {cardId,email,amount,qty,shipAddress,packageId,userid,} = req.body;

    let order;

    try{
        order = new Order({email,packageId,issue});
        await order.save();
    }catch(err){
        console.log(err);
    }
    //don't insert users
    if(!order){
        return res.status(404).json({message:"unable to add delay"})
    }
    return res.status(200).json({order});
};

//Get by Id
const getById = async(req,res,next)=>{

    const id = req.params.id;

    let order;

    try{
        order = await Order.findById(id);
    }catch(err){
        console.log(err);
                 
    }
    
    //not available forms
    if(!Order){
        return res.status(404).json({message:"Forms not found"})
    }
    return res.status(200).json({order});

}

//update Delay Details
const updateOrder = async(req,res,next)=>{

    const id = req.params.id;
    const {email,packageId,issue}=req.body;

    let order;

    try{
        order = await Order.findByIdAndUpdate(id,
            {email:email,packageId:packageId,issue:issue});
            order = await Delay.save();
    }catch(err){
        console.log(err);    
    }
    if(!order){
        return res.status(404).json({message:"unable to update delay forms details"})
    }
    return res.status(200).json({order});

};


//delete delay details 
const deleteOrder = async(req,res,next)=>{

    const id = req.params.id;
   

    let order;

    try{
        order = await Order.findByIdAndDelete(id)
           
    }catch(err){
        console.log(err);    
    }
    if(!order){
        return res.status(404).json({message:"unable to delete form details"})
    }
    return res.status(200).json({order});

};





exports.getAllOrder = getAllOrder;
exports.addOrder = addOrder;
exports.getById = getById;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
