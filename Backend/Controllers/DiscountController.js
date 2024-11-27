const discount = require("../Model/DiscountModel");
//data display
const getAlldiscounts = async(req, res, next) =>{

    let discounts;

    try{
        discounts = await discount.find();
    }catch (err){
        console.log(err);
    }
    //not found
    if(!discounts){
        return res.status(404).json({message:"Promotion not found"});
    }
    //Display all discounts
    return res.status(200).json({discounts});

};

//data insert
const adddiscounts = async (req, res, next) =>{

    const {psid,name, ptype, type, amount, applicableProduct, startDate, endDate} = req.body;

    let discounts;

    try{
        discounts = new discount({psid,name, ptype , type, amount, applicableProduct, startDate, endDate});
        await discounts.save();
    } catch (err){
        console.log(err);
    }

    //not insert discounts
    if(!discounts){
        return res.status(404).send({message: "unable to add discounts"});
    }
    return res.status(200).json({discounts})
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let discounts;

    try{
        discounts = await discount.findById(id);
    }catch(err){
        console.log(err);

    }
// not available discounts
    if(!discounts){
        return res.status(404).send({message: "discount not found"});
    }
    return res.status(200).json({discounts})
};

//update discount details
const updateDiscount = async (req, res, next) =>{

    const id = req.params.id;
    const {psid,name, ptype, type, amount, applicableProduct, startDate,endDate} = req.body;

    let discounts;

    try{
        discounts = await discount.findByIdAndUpdate(id, {psid:psid, name: name,ptype:ptype, type:type, amount:amount, applicableProduct:applicableProduct, startDate:startDate, endDate:endDate});
        discounts = await discounts.save();
    } catch(err){
        console.log(err);
    }

    //not update discount
    if(!discounts){
        return res.status(404).send({message: "discount not update"});
    }
    return res.status(200).json({discounts})

};

//Delete discount details
const deleteDiscount = async (req, res, next) =>{

    const id = req.params.id;

    let discounts;

    try{
        discounts = await discount.findByIdAndDelete(id);
    }catch (err){

        console.log(err);
    }

    //not delete discounts
    if(!discounts){
        return res.status(404).send({message: "discount not delete"});
    }
    return res.status(200).json({discounts})

};


exports.getAlldiscounts=getAlldiscounts;
exports.adddiscounts=adddiscounts;
exports.getById=getById;
exports.updateDiscount=updateDiscount;
exports.deleteDiscount=deleteDiscount;