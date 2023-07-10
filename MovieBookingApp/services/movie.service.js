const Movie = require('../models/movie.model');
const {sendEmail} = require('../utils/notificationClient');
const {mailTemplate} = require('../utils/notificationMailTemplate');

const getAllMovies = async(data) =>{
    let movies =[];
    if(data.name){
        movies = await getMoviesByName(data.name);
    }else{
        movies = await Movie.find();
    }
    return movies;
}

const createMovie = async(data, user)=>{
    const movieObj = {
        name: data.name,
        description: data.description,
        casts: data.casts,
        rating: data.rating,
        genre: data.genre,
        posterUrl: data.posterUrl,
        trailerUrl: data.trailerUrl,
        language: data.language,
        releaseDate: data.releaseDate,
        releaseStatus: data.releaseStatus,
        director: data.director,
    }
    const movie = await Movie.create(movieObj);
    const emailContent = mailTemplate(user.name, `${movie.name} is created successfully.`, `Movie Information: ${movie}`);
    
    sendEmail(
        "Movie is created successfully", 
        emailContent, 
        user.email,
        user.email,
        movie._id.toString()
    );
    return movie;
}

const getMovieById = async(movieId) =>{
    const movie = await Movie.findOne({_id:movieId});
    return movie;
}


const getMoviesByName = async(movieName) =>{
    const movie = await Movie.find({name: movieName});
    return movie;
}

const updateMovie = async(movieId, updates, user) =>{
    const movie = await Movie.findOne({_id: movieId});
    movie.name = updates.name || movie.name;
    movie.description = updates.description || movie.description;
    movie.casts = updates.casts || movie.casts;
    movie.rating = updates.rating || movie.rating;
    movie.genre = updates.genre || movie.genre; 
    movie.posterUrl = updates.posterUrl || movie.posterUrl; 
    movie.trailerUrl = updates.trailerUrl || movie. trailerUrl;
    movie.language = updates.language || movie.language; 
    movie.releaseDate = updates.releaseDate || movie.releaseDate; 
    movie.releaseStatus = updates.releaseStatus || movie.releaseStatus; 
    movie.director = updates.director || movie.director; 

    const updatedMovie = await Movie.findOneAndUpdate({_id: movieId}, movie, {new: true});
    const emailContent = mailTemplate(user.name, `${updatedMovie.name} is updated successfully.`, `Movie Information: ${updatedMovie}`);
        
    sendEmail(
        "Movie is updated successfully", 
        emailContent, 
        user.email,
        user.email,
        updatedMovie._id.toString()
    );
    return updatedMovie;
}

const deleteMovie = async(movieId, user) =>{
    const movie = await Movie.findOneAndDelete({_id: movieId});
    const emailContent = mailTemplate(user.name, `${movie.name} is deleted successfully.`, `Movie Information: ${movie}`);
    sendEmail(
        "Movie is deleted successfully", 
        emailContent, 
        user.email,
        user.email,
        movie._id.toString()
    );
    return movie;
}

const getTheatresList = async(movieId) =>{
    const movie = await Movie.findOne({_id: movieId});
    return movie.theatres;
}

module.exports = {getAllMovies, createMovie, getMovieById, getMoviesByName, updateMovie, deleteMovie, getTheatresList};