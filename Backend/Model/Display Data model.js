const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userimage:{
        type: String,
        default: "",
    },
    userRegNo:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    nic:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [
            {
                validator: function(value) {
                    // Check if NIC is either 12 or 9 characters long
                    return value.length === 12 || value.length === 9;
                },
                message: 'NIC must be either 12 or 9 characters long'
            },
            {
                validator: function(value) {
                    // Check if NIC contains only digits
                    return /^\d+$/.test(value);
                },
                message: 'NIC must contain only digits'
            }
        ]
     },
    password:{
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
       type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    }, 
    phoneNo:{
        type: Number,
        required: true,
        unique: true,
    },
    usertAddress:{
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model(
    "User_Details", // Model name
    userSchema
);
