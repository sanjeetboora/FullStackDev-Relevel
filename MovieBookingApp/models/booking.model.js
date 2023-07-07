const mongoose = require('mongoose');

/**
 * Schema of the booking resource to be stored in the DB
 */

const bookingSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Theatre'
    },
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Movie'
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    paymentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Payment'
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
	status: {
        type: String,
        required: true,
        default: "IN_PROGRESS"
    },
	noOfSeats: {
        type: Number,
        required: true
    },
	totalCost: {
        type: Number,
        required: true,
        default: 0
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
},{

})

module.exports = mongoose.model('Booking', bookingSchema);