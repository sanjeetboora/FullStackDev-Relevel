const movieController = require("../controllers/movie.controller");
const {validateMovieReqBody} = require('../middlewares/movie/requestValidators')
const {verifyUserWithToken, isUserStatusApproved, isAdmin} = require('../middlewares/auth/authJwtToken');
module.exports = function(app){
    
    // to get all the movies or get all movies by name
    app.get('/mba/api/v1/movies', movieController.getAllMovies);

    // to get the movie by id
    app.get('/mba/api/v1/movies/:id', movieController.getMovieById);

    // to create a movie
    app.post('/mba/api/v1/movies', [validateMovieReqBody, verifyUserWithToken, isUserStatusApproved, isAdmin], movieController.createMovie);

    // to update a movie
    app.put('/mba/api/v1/movies/:id', [verifyUserWithToken, isUserStatusApproved, isAdmin], movieController.updateMovie);

    // to delete a movie
    app.delete('/mba/api/v1/movies/:id', [verifyUserWithToken, isUserStatusApproved, isAdmin], movieController.deleteMovie);

    // to get the list of theatres running the given movie by movieId
    app.get('/mba/api/v1/movies/:id/theatres', movieController.getTheatresList);
}