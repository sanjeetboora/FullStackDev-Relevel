const mongoose = require('mongoose');

/**
 * Schema of the booking resource to be stored in the DB
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