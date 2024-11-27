const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    packageId:{
        type:String, //datatype
        required:true, //validate
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    address:{
        type:String, //datatype
        required:true, //validate
    },
    packSize:{
        type:String, //datatype
        required:true, //validate
    },
    weight:{
        type:String, //datatype
        required:true, //validate
    },
    delman:{
        type:String, //datatype
        required:true, //validate
    },
    delservice:{
        type:String, //datatype
        required:true, //validate
    },
   
    
});

module.exports = mongoose.model(
    "delivery", //file name
    deliverySchema //function name
)

