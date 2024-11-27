const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const delaySchema = new Schema({
    email: {
        type: String,
        required: true,
        
        
    },
    packId:{
        type:String, //datatype
        required:true, //validate
    },
    issue:{
        type:String, //datatype
        required:true, //validate
    },
   

});

module.exports = mongoose.model(
    "delay", //file name
    delaySchema //function name
)


