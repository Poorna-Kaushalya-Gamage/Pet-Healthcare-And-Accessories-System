const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reminderSchema = new Schema ({
    reminderMsg:{
        type:String,
        require:true,
    },
    remindAt:{
        type:String,
        require:true,
    },
    isReminded:{
        type:Boolean,
    },

})

module.exports = mongoose.model(
    "userReminder",
    reminderSchema
)