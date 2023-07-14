const Booking = require('../../models/booking.model');
const Showroom = require('../../models/showroom.model');
const { userTypes } = require('../../utils/constants');

const validateBookingReqBody = async(req, res, next) =>{
    try{
        // validate if all the fields are provided
        if(!req.body.showroomId){
            throw new Error("value for field 'showroomId' is not provided")
        }
        if(req.body.noOfSeatsToBook == undefined || req.body.noOfSeatsToBook == null){
            throw new Error("value for field 'noOfSeatsToBook' is not provided")
        }
        if(req.body.totalCost == undefined || req.body.totalCost == null){
            throw new Error("value for field 'totalCost' is not provided")
        }
        if(req.body.seatsToBook == undefined || req.body.seatsToBook == null){
            throw new Error("value for field 'seatsToBook' is not provided")
        }
        // showroomId is valid
        const showroom = await Showroom.findOne({_id:req.body.showroomId})
        if(!showroom){
            throw new Error(`invalid showroom id: ${req.body.showroomId}`)
        }
        // noOfSeatsToBook to book are valid
        if(req.body.noOfSeatsToBook < 0){
            throw new Error("value for field 'noOfSeatsToBook' is invalid")
        }

        // noOfSeatsToBook: 3
        // seatsToBook: [45, 78, 79]
        //noOfSeatsToBook should be equal to length of list of chosen seats to book
        if(req.body.noOfSeatsToBook != req.body.seatsToBook.length){
            throw new Error("value for field 'noOfSeatsToBook' is not matching with length of provided list of seats to book")
        }
        //list of chosen seats to book is having unique seat numbers
        const seatsSet = new Set(req.body.seatsToBook);
        if(seatsSet.size() != req.body.seatsToBook.length){
            throw new Error("seat numbers provided for field 'seatsToBook' are not unique")
        }
        //totalCost is valid
        if(req.body.totalCost < 0){
            throw new Error("value for field 'totalCost' is invalid")
        }
        next();
    }
    catch(err){
        return res.status(400).send({
                message: err.message
            })
        }
};

const isValidBookingId = async(req, res, next) => {
    try{
        const bookingId = req.params.id;
        const booking = await Booking.findOne({_id: bookingId});
        if(!booking){
            throw new Error(`invalid booking id: ${bookingId}`);
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
            const bookingId = req.params.id;
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

module.exports = {validateBookingReqBody, isAdminOrBookingOwner, isValidBookingId}