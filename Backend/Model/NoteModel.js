const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteAppSchema = new Schema ({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model(
    "noteApp",
    noteAppSchema
)