const Booking = require('../../models/booking.model');
const Theatre = require('../../models/theatre.model');
const Movie = require('../../models/movie.model');
const { userTypes } = require('../../utils/constants');

const validateBookingReqBody = async(req, res, next) =>{
    try{
        // validate if all the fields are provided
        if(!req.body.theatreId){
            throw new Error("value for field 'theatreId' is not provided")
        }
        if(!req.body.movieId){
            throw new Error("value for field 'movieId' is not provided")
        }
        if(!req.body.startTime){
            throw new Error("value for field 'startTime' is not provided")
        }
        if(!req.body.endTime){
            throw new Error("value for field 'endTime' is not provided")
        }
        if(req.body.noOfSeats == undefined || req.body.noOfSeats == null){
            throw new Error("value for field 'noOfSeats' is not provided")
        }
        if(req.body.totalCost == undefined || req.body.totalCost == null){
            throw new Error("value for field 'totalCost' is not provided")
        }

        // theatreId is valid
        const theatre = await Theatre.findOne({_id:req.body.theatreId})
        if(!theatre){
            throw new Error(`invalid theatre id: ${req.body.theatreId}`)
        }
        // movieId is valid
        const movie = await Movie.findOne({_id:req.body.movieId});

        if(!movie){
            throw new Error(`invalid movie id: ${req.body.movieId}`)
        }

        if(req.body.noOfSeats < 0){
            throw new Error("value for field 'noOfSeats' is invalid")
        }

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