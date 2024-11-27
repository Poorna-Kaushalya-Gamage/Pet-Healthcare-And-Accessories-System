const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema({

    psid:{
        type: String,
        required: true,
        unique: true
    },

    name:{
        type: String,
        required: true
    },

    ptype:{
        type: String,
        required: true
    },

    type:{
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: [0, "Amount cannot be negative"]
    },

    applicableProduct: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        required: true
        /*validate: {
            validator: function(startDate) {
              
              return startDate && startDate.getTime() < Date.now();
            },
            message: "Start Date should be in the past",
          },*/
    },

    endDate: {
        type: Date,
        required: true
        /* validate: {
            validator: function(endDate) {
              
              const startDate = this.startDate; 
              return endDate && endDate.getTime() > startDate.getTime();
            },
            message: "End Date should be after Start Date", 
          },*/
    }

});

module.exports = mongoose.model("petdiscount",discountSchema);



