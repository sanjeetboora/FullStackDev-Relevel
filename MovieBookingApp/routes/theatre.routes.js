const theatreController = require('../controllers/theatre.controller');

module.exports = function(app){
    //  - API to get all theatres on the bases of query params
    app.get('/mba/api/v1/theatres', theatreController.getAllTheatres);

    // 	- API to get a theatre by id
    app.get('/mba/api/v1/theatres/:id', theatreController.getTheatreById);

    // 	- API to create a theatre
    app.post('/mba/api/v1/theatres', theatreController.createTheatre);

    // 	- API to update a theatre
    app.put('/mba/api/v1/theatres/:id', theatreController.updateTheatre);

    //  - API to delete a theatre
    app.delete('/mba/api/v1/theatres/:id', theatreController.deleteTheatre);

    // Add/Delete movies to a theatre
    app.put('/mba/api/v1/theatres/:id/movies', theatreController.updateMoviesInTheatre);

    // To check if a given movie is running in a given theatre
    app.get('/mba/api/v1/theatres/:theatreId/movies/:movieId', theatreController.checkMovieInATheatre);

}