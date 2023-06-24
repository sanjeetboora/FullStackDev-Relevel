const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    passowrd:{
        type: String,
        required: true,
    },
    userType:{
        type: String,
        required: true,
        enum: ["customer", "client", "admin"],
        default: "customer"
    },
    userStatus:{
        type: String,
        required: true,
        enum: ["approved", "pending", "suspended", "rejected"],
        default: "approved"
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now(),
        immutable: true
    },
    updatedAt:{
        type: Date,
        required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model("User", userSchema);