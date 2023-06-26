const Movie = require('../models/movie.model');

const getAllMovies = async(data) =>{
    let movies =[];
    if(data.name){
        movies = await getMoviesByName(data.name);
    }else{
        movies = await Movie.find();
    }
    return movies;
}

const createMovie = async(data)=>{
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

const updateMovie = async(movieId, updates) =>{
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
    return updatedMovie;
}

const deleteMovie = async(movieId) =>{
    const movie = await Movie.findOneAndDelete({_id: movieId});
    return movie;
}

const getTheatresList = async(movieId) =>{
    const movie = await Movie.findOne({_id: movieId});
    return movie.theatres;
}

module.exports = {getAllMovies, createMovie, getMovieById, getMoviesByName, updateMovie, deleteMovie, getTheatresList};