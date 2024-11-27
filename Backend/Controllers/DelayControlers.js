const Delay = require("../Model/DelayModel");

//data display
const getAllDelay = async (req, res, next)=>{

    let delay;

    try{
        delay = await Delay.find();
    }catch(err){
        console.log(err);
    }
    //not found users
    if(!delay){
        return res.status(404).json({message:"delay forms not found"});
    }
    //Display all users
    return res.status(200).json({delay});
};

const addDelay = async(req,res,next)=>{

    const {email,packId,issue} = req.body;

    let delay;

    try{
        delay = new Delay({email,packId,issue});
        await delay.save();
    }catch(err){
        console.log(err);
    }
    //don't insert users
    if(!delay){
        return res.status(404).json({message:"unable to add delay"})
    }
    return res.status(200).json({delay});
};

//Get by Id
const getById = async(req,res,next)=>{

    const id = req.params.id;

    let delay;

    try{
        delay = await Delay.findById(id);
    }catch(err){
        console.log(err);
                 
    }
    
    //not available forms
    if(!Delay){
        return res.status(404).json({message:"Forms not found"})
    }
    return res.status(200).json({delay});

}

//update Delay Details
const updateDelay = async(req,res,next)=>{

    const id = req.params.id;
    const {email,packId,issue}=req.body;

    let delay;

    try{
        delay = await Delay.findByIdAndUpdate(id,
            {email:email,packId:packId,issue:issue});
            delay = await Delay.save();
    }catch(err){
        console.log(err);    
    }
    if(!delay){
        return res.status(404).json({message:"unable to update delay forms details"})
    }
    return res.status(200).json({delay});

};


//delete delay details 
const deleteDelay = async(req,res,next)=>{

    const id = req.params.id;
   

    let delay;

    try{
        delay = await Delay.findByIdAndDelete(id)
           
    }catch(err){
        console.log(err);    
    }
    if(!delay){
        return res.status(404).json({message:"unable to delete form details"})
    }
    return res.status(200).json({delay});

};





exports.getAllDelay = getAllDelay;
exports.addDelay = addDelay;
exports.getById = getById;
exports.updateDelay = updateDelay;
exports.deleteDelay = deleteDelay;
