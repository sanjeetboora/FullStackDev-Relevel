const Booking = require('../../models/booking.model');
const Payment = require('../../models/payment.model');
const { userTypes } = require('../../utils/constants');

const validatePaymentReqBody = async(req, res, next) => {
    try{
        // validate if all the fields are provided
        if(!req.body.bookingId){
            throw new Error("value for field 'bookingId' is not provided")
        }
        if(!req.body.amount){
            throw new Error("value for field 'amount' is not provided")
        }
        if(!req.body.status){
            throw new Error("value for field 'status' is not provided")
        }

        // bookingId is valid
        const booking = await Booking.findOne({_id:req.body.bookingId})
        if(!booking){
            throw new Error(`invalid booking id: ${req.body.bookingId}`)
        }

         // amount is valid
         if(req.body.amount < 0){
             throw new Error(`invalid amount: ${req.body.amount}`)
         }

        next();
    }
    catch(err){
        return res.status(400).send({
                message: err.message
            })
        }
}

const isValidPaymentId = async(req, res, next) => {
    try{
        const paymentId = req.params.id;
        const payment = await Payment.findOne({_id: paymentId});
        if(!payment){
            throw new Error("Invalid payment id");
        }
        next();
    }
    catch(err){
        return res.status(401).send({
                message: err.message
            })
    }
}

const isAdminOrBookingOwner = async(req, res, next) => {
    try{
        const currentUser = req.user;
        if(req.user.userType == userTypes.admin){
            next();
        }
        else{
            const bookingId = req.body.bookingId;
            const booking = await Booking.findOne({_id: bookingId});
            if(currentUser._id.toString() != booking.userId){
                throw new Error("Only admin or booking owner can access it");
            }
            next();
        }
    }
    catch(err){
        return res.status(401).send({
                message: err.message
            })
    }
}


module.exports = {isAdminOrBookingOwner, validatePaymentReqBody, isValidPaymentId}