const Theatre = require('../../models/theatre.model');
const Movie = require('../../models/movie.model');
const Showroom = require('../../models/showroom.model');
const { showroomTimeSlots, userTypes } = require('../../utils/constants');

const validateShowroomReqBody = async(req, res, next) =>{
    try{
        // validate if all the required fields are provided
        if(!req.body.theatreId){
            throw new Error("value for field 'theatreId' is not provided")
        }
        if(!req.body.movieId){
            throw new Error("value for field 'movieId' is not provided")
        }
        if(!req.body.totalSeats){
            throw new Error("value for field 'totalSeats' is not provided")
        }
        if(!req.body.bookedSeats){
            throw new Error("value for field 'bookedSeats' is not provided")
        }
        if(!req.body.timeSlot){
            throw new Error("value for field 'timeSlot' is not provided")
        }
        if(!req.body.date){
            throw new Error("value for field 'date' is not provided")
        }
        //validate if theatre id correct
        const theatre =  await Theatre.findOne({_id: req.body.theatreId});
        if(!theatre){
            throw new Error("value for field 'theatreId' is invalid");
        }
        //validate if movie id correct
        const movie =  await Movie.findOne({_id: req.body.movieId});
        if(!movie){
            throw new Error("value for field 'movieId' is invalid");
        }

        //validate if total seats is having a valid value
        if(req.body.totalSeats < 0){
            throw new Error("value for field 'totalSeats' is invalid");
        }

        //validate if bookedSeats is having unique values
        if(req.body.bookedSeats.length > 0){
            const bookedSeatsSet = new Set(req.body.bookedSeats);
            if(bookedSeatsSet.size() != req.body.bookedSeats.length){
                throw new Error("seat numbers provided for field 'bookedSeats' are not unique")
            }
        }
        //validate if timeSlot is having valid value
        if (!(req.body.timeSlot in showroomTimeSlots)){
            throw new Error("value provided for field 'timeSlot' is invalid");
        }
        //validate if date is having valid value
        if(req.body.date < Date.now()){
            throw new Error("value provided for field 'date' is invalid");
        }

        const existingShowroom = await Showroom.findOne({
            theatreId: req.body.theatreId,
            movieId: req.body.movieId,
            timeSlot: req.body.timeSlot,
            date: req.body.date,
        });
        if(existingShowroom){
            throw new Error(`A showroom already exists with provided configuration. Existing Showroom: ${existingShowroom}`);
        }
        next();
   }
   catch(err){
    return res.status(400).send({
            message: err.message
        })
    }
}

const isAdminOrTheatreOwner = async(req, res, next) =>{
    try{
        const currentUser = req.user;
        if(req.user.userType == userTypes.admin){
            next();
        }
        else{
            const theatreId = req.body.theatreId;
            const theatre = await Theatre.findOne({_id: theatreId});
            if(currentUser._id.toString() != theatre.createdBy.toString()){
                throw new Error("Only theatre owner can create/update/delete showroom");
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


const isAdminOrTheatreOwnerUsingShowroomId = async(req, res, next) =>{
    try{
        const currentUser = req.user;
        if(req.user.userType == userTypes.admin){
            next();
        }
        else{
            const showroom = await Showroom.findOne({_id : req.params.id});
            const theatre = await Theatre.findOne({_id: showroom.theatreId});
            if(currentUser._id.toString() != theatre.createdBy.toString()){
                throw new Error("Only theatre owner can create/update/delete showroom");
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


module.exports = {validateShowroomReqBody, isAdminOrTheatreOwner, isAdminOrTheatreOwnerUsingShowroomId}