const Booking = require('../models/booking.model');
const User = require('../models/user.model');
const Showroom = require('../models/showroom.model');

const createBooking = async(data, user)=>{
    const bookingObj = {
        showroomId: data.showroomId,
        userId: user._id,
        noOfSeatsToBook: data.noOfSeatsToBook,
        seatsToBook: data.seatsToBook,
        totalCost: data.totalCost,
    }
    const booking = await Booking.create(bookingObj);

    const userInfo = await User.findOne({_id:booking.userId});
    userInfo.bookings.push(booking._id);
    await User.findOneAndUpdate({_id: userInfo._id}, userInfo);

    const showroom = await Showroom.findOne({_id:booking.showroomId});
    showroom.bookings.push(booking._id);
    await Showroom.findOneAndUpdate({_id: showroom._id}, showroom);

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

const getBookingByShowroomId = async(showroomId)=>{
    const showroom = await Showroom.findOne({_id: showroomId});
    return showroom.bookings;
}

const updateBooking = async(bookingId, data) =>{
    const booking = await Booking.findOne({_id: bookingId});

    if(!booking){
        throw new Error("invalid booking id");
    }

    booking.showroomId = data.showroomId || booking.showroomId;
    booking.noOfSeatsToBook = data.noOfSeatsToBook || booking.noOfSeatsToBook,
    booking.seatsToBook = data.seatsToBook || booking.seatsToBook,
    booking.totalCost = data.totalCost || booking.totalCost;
    booking.status = data.status || booking.status;

    const updatedBooking = await Booking.findOneAndUpdate({_id: bookingId}, booking, {new: true});
    return updatedBooking;
}

module.exports = {createBooking, getAllBookings, getBookingByBookingId, getBookingByShowroomId, updateBooking};