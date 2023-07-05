const Booking = require('../models/booking.model');
const Movie = require('../models/movie.model');
const User = require('../models/user.model');
const Theatre = require('../models/theatre.model');

const createBooking = async(data, user)=>{
    const bookingObj = {
        theatreId: data.theatreId,
        movieId: data.movieId,
        userId: user._id,
        startTime: data.startTime,
        endTime: data.endTime,
        noOfSeats: data.noOfSeats,
        totalCost: data.totalCost,
    }
    const booking = await Booking.create(bookingObj);

    const userInfo = await User.findOne({_id:booking.userId});
    userInfo.bookings.push(booking._id);
    await User.findOneAndUpdate({_id: userInfo._id}, userInfo);

    const movie = await Movie.findOne({_id:booking.movieId});
    movie.bookings.push(booking._id);
    await Movie.findOneAndUpdate({_id: movie._id}, movie);

    const theatre = await Theatre.findOne({_id:booking.theatreId});
    theatre.bookings.push(booking._id);
    await Theatre.findOneAndUpdate({_id: theatre._id}, theatre);

    return booking;
}

const getAllBookings = async()=>{
    const bookings = await Booking.find();
    return bookings;
}

const getBookingByBookingId = async(bookingId)=>{
    const booking = await Booking.findOne({_id: bookingId});
    return booking;
}

const getBookingByTheatreId = async(theatreId)=>{
    const theatre = await Theatre.findOne({_id: theatreId});
    return theatre.bookings;
}

const getBookingByTheatreIdAndMovieId = async(theatreId, movieId)=>{
    const theatre = await Theatre.findOne({_id: theatreId});
    const movie = await Movie.findOne({_id: movieId});
    const result = [];
    for(const booking of theatre.bookings){
        movie.bookings.filter((movieBooking) =>{
            if(movieBooking.equals(booking)){
                result.push(movieBooking);
            }
        })
    }
    return result;
}

const updateBooking = async(bookingId, data) =>{
    const booking = await Booking.findOne({_id: bookingId});

    if(!booking){
        throw new Error("invalid booking id");
    }

    booking.theatreId = data.theatreId || booking.theatreId;
    booking.movieId = data.movieId || booking.movieId;
    booking.startTime = data.startTime || booking.startTime;
    booking.endTime = data.endTime || booking.endTime;
    booking.noOfSeats = data.noOfSeats || booking.noOfSeats,
    booking.totalCost = data.totalCost || booking.totalCost;
    booking.status = data.status || booking.status;

    const updatedBooking = await Booking.findOneAndUpdate({_id: bookingId}, booking, {new: true});
    return updatedBooking;
}

module.exports = {createBooking, getAllBookings, getBookingByBookingId, getBookingByTheatreId, getBookingByTheatreIdAndMovieId, updateBooking};