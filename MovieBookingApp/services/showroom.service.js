const Showroom = require('../models/showroom.model');
const User = require('../models/user.model');
const Theatre = require('../models/theatre.model');
const {sendEmail} = require('../utils/notificationClient');
const {mailTemplate} = require('../utils/notificationMailTemplate');

const getAllShowrooms = async(filters) => {
    const showrooms = await Showroom.find(filters);
    return showrooms;
}

const createShowroom = async(data, user) => {
    const showroomObj = {
        theatreId: data.theatreId,
        movieId: data.movieId,
        totalSeats: data.totalSeats, 
        bookedSeats: data.bookedSeats,
        timeSlot: data.timeSlot,
        date: data.date,
        bookings: data.bookings,
    }
    const showroom = await Showroom.create(showroomObj);
    const emailContent = mailTemplate(user.name, `showroom is created successfully.`, `Showroom Information: ${showroom}`);
    sendEmail(
        "Showroom is created successfully", 
        emailContent, 
        user.email,
        user.email,
        showroom._id.toString()
    );
    return showroom;
}

const getShowroomById = async(showroomId) =>{
    try{
        const showroom = await Showroom.findOne({_id : showroomId});
        return showroom;
    }catch(err){
        return {
            error: err.message
        }
    }
}


const updateShowroom = async(showroomId, data) =>{
    try{
        const showroom = await Showroom.findOne({_id : showroomId});

        showroom.theatreId =  data.theatreId || showroom.theatreId;
        showroom.movieId =  data.movieId || showroom.movieId;
        showroom.totalSeats =  data.totalSeats || showroom.totalSeats;
        showroom.bookedSeats =  data.bookedSeats || showroom.bookedSeats;
        showroom.timeSlot =  data.timeSlot || showroom.timeSlot;
        showroom.date =  data.date || showroom.date;
        showroom.bookings =  data.bookings || showroom.bookings;

        const updatedShowroom = await Showroom.findOneAndUpdate({_id : showroomId}, showroom, {new: true});
        const theatre = await Theatre.findOne({_id: updatedShowroom.theatreId});
        const user = await User.findOne({_id: theatre.createdBy});
        const emailContent = mailTemplate(user.name, `Showroom is updated successfully.`, `Showroom Information: ${updatedShowroom}`);
        sendEmail(
            "Showroom is updated successfully", 
            emailContent, 
            user.email,
            user.email,
            updatedShowroom._id.toString()
        );
        return updatedShowroom;
    }catch(err){
        return {
            error: err.message
        }
    }
}


const deleteShowroom = async(showroomId) =>{
    try{
        const showroom = await Showroom.findOneAndDelete({_id : showroomId});
        const theatre = await Theatre.findOne({_id: showroom.theatreId});
        const user = await User.findOne({_id: theatre.createdBy});
        const emailContent = mailTemplate(user.name, `showroom is deleted successfully.`, `Showroom Information: ${showroom}`);
        sendEmail(
            "Showroom is deleted successfully", 
            emailContent, 
            user.email,
            user.email,
            theatre._id.toString()
        );
        return showroom;

    }catch(err){
        return {
            error: err.message
        }
    }
}

module.exports = {getAllShowrooms, createShowroom, getShowroomById, updateShowroom, deleteShowroom}