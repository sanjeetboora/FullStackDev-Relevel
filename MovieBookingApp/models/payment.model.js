const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Booking"
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "IN_PROGRESS"
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
},
{

})

module.exports = mongoose.model("Payment", paymentSchema); 