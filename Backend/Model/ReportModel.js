const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema({


    title:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },

    pdf:{
        type: String,
        required: true
    },

    

    

});

module.exports = mongoose.model("inventoryreports",reportSchema);