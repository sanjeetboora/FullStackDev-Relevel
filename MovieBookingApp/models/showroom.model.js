const mongoose = require('mongoose');

/**
 * Schema of the showroom resource to be stored in the DB
 * Showroom is nothing but defines a show only i.e. the combination of Theatre + Movie + Timeslot
 */

const showroomSchema = new mongoose.Schema({
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
	totalSeats: {
        type: Number,
        required: true
    },
    bookedSeats: {
        type: [Number],
        required: true
    },
    timeSlot:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now(),
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
},{

})

module.exports = mongoose.model('Showroom', showroomSchema);