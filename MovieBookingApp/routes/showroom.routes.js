const showroomController = require('../controllers/showroom.controller');
const {validateShowroomReqBody, isAdminOrTheatreOwner, isAdminOrTheatreOwnerUsingShowroomId} = require('../middlewares/showroom/requestValidator');
const {verifyUserWithToken, isUserStatusApproved} = require('../middlewares/auth/authJwtToken');


module.exports = function(app){
    //  - API to get all showrooms on the bases of query params [movieId,TheatreId]
    app.get('/mba/api/v1/showrooms', showroomController.getAllShowrooms);

    // 	- API to get a showroom by id
    app.get('/mba/api/v1/showrooms/:id', showroomController.getShowroomById);

    // 	- API to create a showroom
    app.post('/mba/api/v1/showrooms',[validateShowroomReqBody, verifyUserWithToken, isUserStatusApproved, isAdminOrTheatreOwner], showroomController.createShowroom);

    // 	- API to update a showroom
    app.put('/mba/api/v1/showrooms/:id', [verifyUserWithToken, isUserStatusApproved, isAdminOrTheatreOwnerUsingShowroomId], showroomController.updateShowroom);

    //  - API to delete a Showroom
    app.delete('/mba/api/v1/showrooms/:id', [verifyUserWithToken, isUserStatusApproved, isAdminOrTheatreOwnerUsingShowroomId], showroomController.deleteShowroom);

}



// showroom => movie + theatre + timeslot