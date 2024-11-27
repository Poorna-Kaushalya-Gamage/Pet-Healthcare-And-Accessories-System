const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reorderSchema = new Schema({

    prid:{
        type: String,
        required: true,
        unique: true
    },

    name:{
        type: String,
        required: true
    },

    reorderQuantity:{
        type: String,
        required: true,
        min: [0, "Reorder Quantity cannot be negative"]
    },

    supplierName: {
        type: String,
        required: true
    },

    supplierNo: {
        type: Number,
        required: true
        
    }

});

module.exports = mongoose.model("reorder",reorderSchema);