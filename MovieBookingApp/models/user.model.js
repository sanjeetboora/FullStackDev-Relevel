const mongoose = require('mongoose');
const {userTypes, userStatus} = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    userType:{
        type: String,
        required: true,
        enum: [userTypes.customer, userTypes.client, userTypes.admin],
        default: userTypes.customer
    },
    userStatus:{
        type: String,
        required: true,
        enum: [userStatus.approved, userStatus.pending, userStatus.suspended, userStatus.rejected],
        default: userStatus.approved
    },
    bookings: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Booking"
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