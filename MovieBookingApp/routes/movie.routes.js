const movieController = require("../controllers/movie.controller");


module.exports = function(app){
    
    // to get all the movies or get all movies by name
    app.get('/mba/api/v1/movies', movieController.getAllMovies);

    // to get the movie by id
    app.get('/mba/api/v1/movies/:id', movieController.getMovieById);

    // to create a movie
    app.post('/mba/api/v1/movies', movieController.createMovie);

    // to update a movie
    app.put('/mba/api/v1/movies/:id', movieController.updateMovie);

    // to delete a movie
    app.delete('/mba/api/v1/movies/:id', movieController.deleteMovie);
}