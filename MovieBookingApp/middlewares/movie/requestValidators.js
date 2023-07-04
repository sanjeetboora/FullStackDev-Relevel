const Movie = require('../../models/movie.model');

const validateMovieReqBody = async(req, res, next) =>{
    try{
        // validate if all the fields are provided
        if(!req.body.name){
            throw new Error("value for field 'name' is not provided")
        }
        if(!req.body.description){
            throw new Error("value for field 'description' is not provided")
        }
        if(!req.body.director){
            throw new Error("value for field 'director' is not provided")
        }
        if(!req.body.casts){
            throw new Error("value for field 'casts' is not provided")
        }
        if(!req.body.rating){
            throw new Error("value for field 'rating' is not provided")
        }
        if(!req.body.genre){
            throw new Error("value for field 'genre' is not provided")
        }
        if(!req.body.posterUrl){
            throw new Error("value for field 'posterUrl' is not provided")
        }
        if(!req.body.trailerUrl){
            throw new Error("value for field 'trailerUrl' is not provided")
        }
        if(!req.body.language){
            throw new Error("value for field 'language' is not provided")
        }
        if(!req.body.releaseDate){
            throw new Error("value for field 'releaseDate' is not provided")
        }
        if(!req.body.releaseStatus){
            throw new Error("value for field 'releaseStatus' is not provided")
        }


        // movie with same name, language and release date doesn't exist already
        const movie = await Movie.findOne({
            name:req.body.name,
            language: req.body.language,
            releaseDate: req.body.releaseDate
        })

        if(movie){
            throw new Error(`Movie with name: ${movie.name}, language: ${movie.language}, releaseDate: ${movie.releaseDate} already exists`);
        }
        next();
    }
    catch(err){
        return res.status(400).send({
                message: err.message
            })
        }
}

module.exports = {validateMovieReqBody}