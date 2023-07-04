const theatreController = require('../controllers/theatre.controller');
const {validateTheatreReqBody, isAdminOrTheatreOwner} = require('../middlewares/theatre/requestValidator');
const {verifyUserWithToken, isUserStatusApproved, isAdminOrClient} = require('../middlewares/auth/authJwtToken');

module.exports = function(app){
    //  - API to get all theatres on the bases of query params
    app.get('/mba/api/v1/theatres', theatreController.getAllTheatres);

    // 	- API to get a theatre by id
    app.get('/mba/api/v1/theatres/:id', theatreController.getTheatreById);

    // 	- API to create a theatre
    app.post('/mba/api/v1/theatres',[validateTheatreReqBody, verifyUserWithToken, isUserStatusApproved, isAdminOrClient], theatreController.createTheatre);

    // 	- API to update a theatre
    app.put('/mba/api/v1/theatres/:id', [verifyUserWithToken, isUserStatusApproved, isAdminOrTheatreOwner], theatreController.updateTheatre);

    //  - API to delete a theatre
    app.delete('/mba/api/v1/theatres/:id', [verifyUserWithToken, isUserStatusApproved, isAdminOrTheatreOwner], theatreController.deleteTheatre);

    // Add/Delete movies to a theatre
    app.put('/mba/api/v1/theatres/:id/movies', [verifyUserWithToken, isUserStatusApproved, isAdminOrTheatreOwner], theatreController.updateMoviesInTheatre);

    // To check if a given movie is running in a given theatre
    app.get('/mba/api/v1/theatres/:theatreId/movies/:movieId', theatreController.checkMovieInATheatre);

}