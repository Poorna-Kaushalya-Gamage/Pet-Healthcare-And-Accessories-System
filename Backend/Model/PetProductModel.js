const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({


    ppid:{
        type: String,
        required: true,
        unique: true
    },

    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },

    image:{
        type: String,
        required: true
    },



    description:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 2000
    },

    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"]
    },

    quantity:{
        type: Number,
        required: true,
        min: [0, "Quantity cannot be negative"]
    },


    manufactureDate:{
        type: String,
        required: true,
        match: [/^\d{4}-\d{2}-\d{2}$/, "Manufacture date must be in the format YYYY-MM-DD"]
    },

    expireDate:{
        type: String,
        required: true,
        validate: {
            validator: function(expireDate) {
                // Custom validation logic to check if expireDate and manufactureDate are not the same
                return this.manufactureDate !== expireDate;
            },
            message: "Expire date cannot be the same as manufacture date"
        }
    },

    stockAlertThreshold:{
        type: Number,
        required: true,
        min: [0, "Stock alert threshold cannot be negative"]
    },

    reorderPoint:{
        type: Number,
        required: true,
        min: [0, "Reorder point cannot be negative"]
    },

    

    category: {
        type: String
        
    },

    brand: {
        type: String
        
    }


});

module.exports = mongoose.model("petproduct", productSchema);
