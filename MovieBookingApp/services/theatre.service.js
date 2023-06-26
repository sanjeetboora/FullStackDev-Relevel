const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');

const getAllTheatres = async(filters) => {
    try{
        const theatres = await Theatre.find(filters);
        return theatres;
    }catch(err){
        return {
            error: err
        }
    }
}

const createTheatre = async(data) => {
    try{
        const theatreObj = {
            name: data.name,
            description: data.description,
            rating: data.rating, 
            street: data.street,
            state: data.state,
            city: data.city,
            pincode: data.pincode,
        }
        const theatre = await Theatre.create(theatreObj);
        return theatre;
    }catch(err){
        return {
            error: err
        }
    }
}

const getTheatreById = async(theatreId) =>{
    try{
        const theatre = await Theatre.findOne({_id : theatreId});
        return theatre;
    }catch(err){
        return {
            error: err
        }
    }
}


const updateTheatre = async(theatreId, data) =>{
    try{
        const theatre = await Theatre.findOne({_id : theatreId});
        theatre.name = data.name || theatre.name;
        theatre.description = data.description || theatre.description;
        theatre.rating = data.rating || theatre.rating;
        theatre.street = data.street || theatre.street;
        theatre.state = data.state || theatre.state;
        theatre.city = data.city || theatre.city;
        theatre.pincode = data.pincode || theatre.pincode;

        const updatedTheatre = await Theatre.findOneAndUpdate({_id : theatreId}, theatre, {new: true});
        return updatedTheatre;
    }catch(err){
        return {
            error: err
        }
    }
}


const deleteTheatre = async(theatreId) =>{
    try{
        const theatre = await Theatre.findOneAndDelete({_id : theatreId});
        return theatre;

    }catch(err){
        return {
            error: err
        }
    }
}

const addMoviesInTheatre = async(theatreId, movieIds) => {
    try{
        const theatre = await Theatre.findOne({_id : theatreId});
        if(theatre){
            if(!movieIds || movieIds.length==0){
                return theatre;
            }
            let count = 0;
            for(const movieId of movieIds){
                count++;
                if(!theatre.movies.includes(movieId))
                {
                    const movie = await Movie.findOne({_id: movieId});
                    if(!movie){
                        throw new Error("Invalid movie id");
                    }
                    movie && theatre.movies.push(movie._id);
                    movie.theatres.push(theatre._id);
                    await Movie.findOneAndUpdate({_id: movie._id}, movie);
                }
                if(count == movieIds.length){
                    const updatedTheatre = await Theatre.findOneAndUpdate({_id : theatreId}, theatre, {new: true});
                    return updatedTheatre;
                }
            };       
        }
    }catch(err){
        return {
            error: err.message
        }
    }
}

const deleteMoviesInTheatre = async(theatreId, movieIds) => {
    try{
        const theatre = await Theatre.findOne({_id : theatreId});
        if(theatre){
            if(!movieIds || movieIds.length==0){
                return theatre;
            }
            let count = 0;
            for(const movieId of movieIds){
                count++;
                const movie = await Movie.findOne({_id: movieId});
                if(!movie){
                    throw new Error("Invalid movie id");
                }
                const index = theatre.movies.indexOf(movieId);
                if(index > -1){// only splice array when item is found
                    theatre.movies.splice(index, 1); // 2nd parameter means remove one item only
                    const theatreIndex = movie.theatres.indexOf(theatre._id);
                    if(theatreIndex > -1){
                        movie.theatres.splice(theatreIndex, 1);
                        await Movie.findOneAndUpdate({_id: movie._id}, movie);
                    }
                }
                if(count == movieIds.length){
                    const updatedTheatre = await Theatre.findOneAndUpdate({_id : theatreId}, theatre, {new: true});
                    return updatedTheatre;
                }
            };       
        }
    }catch(err){
        return {
            error: err.message
        }
    }
}

const updateMoviesInTheatre = async(theatreId, data) => {
    try{
        const theatre = await Theatre.findOne({_id : theatreId});
        if(theatre){
                const abc = await addMoviesInTheatre(theatreId, data.addMovieIds);
                const response = await deleteMoviesInTheatre(theatreId, data.removeMovieIds);
                return response;
        }else{
            throw new Error("Invalid theatre Id");
        }
    }catch(err){
        return {
            error: err.message
        }
    }
}

const checkMovieInATheatre = async(theatreId, movieId) =>{
    try{
        const theatre = await Theatre.findOne({_id : theatreId});
        if(theatre){
                const movie = await Movie.findOne({_id : movieId});
                if(!movie){
                    throw new Error("Invalid movie Id");
                }
                const successMessage = "Movie is present in given theatre";
                const failureMessage =  "Movie is not present in given theatre";
                return {
                    message: theatre.movies.includes(movieId) ? successMessage : failureMessage
                }
        }else{
            throw new Error("Invalid theatre Id");
        }
    }catch(err){
        return {
            error: err.message
        }
    }
}
module.exports = {getAllTheatres, createTheatre, getTheatreById, updateTheatre, deleteTheatre, updateMoviesInTheatre, checkMovieInATheatre}