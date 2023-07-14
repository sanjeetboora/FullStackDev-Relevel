const bookingService = require('../services/booking.service');


const createBooking = async(req, res) =>{
    try{
        const response = await bookingService.createBooking(req.body, req.user);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }    
}

const getAllBookings = async(req, res) =>{
    try{
        const response = await bookingService.getAllBookings();
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }    
}

const getBookingByBookingId = async(req, res) =>{
    try{
        const response = await bookingService.getBookingByBookingId(req.params.id);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }    
}

const getBookingByShowroomId = async(req, res) =>{
    try{
        const response = await bookingService.getBookingByShowroomId(req.params.id);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }    
}

const updateBooking = async(req, res) =>{
    try{
        const response = await bookingService.updateBooking(req.params.id, req.body);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }    
}

module.exports = {createBooking, getAllBookings, getBookingByBookingId, getBookingByShowroomId, updateBooking};
