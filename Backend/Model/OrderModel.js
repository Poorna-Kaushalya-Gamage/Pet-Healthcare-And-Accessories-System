const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Declare the Schema of the Mongo model
const transactionSchema = new Schema({
    cardId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Card"
    },
    amount: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    qty:{
        type:Number,
        min:1,

    },
    shipAddress:{
        type: String,
    },
    productId:{
        type: String,
        required: true,
        
    },
    userid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "users"

    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','approved','completed','rejected']
    }
},{
    timestamps:true
});

module.exports = mongoose.model(
    "transaction", //file name
    transactionSchema //function name
)


