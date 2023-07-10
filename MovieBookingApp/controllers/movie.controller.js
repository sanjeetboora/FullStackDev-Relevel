const movieService = require('../services/movie.service');

const getAllMovies = async(req, res) =>{
    try{
        const response = await movieService.getAllMovies(req.query);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }    
}

const createMovie = async(req, res) =>{
    try{
        const response = await movieService.createMovie(req.body, req.user);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }    
}

const getMovieById = async(req, res) =>{
    try{
        const response = await movieService.getMovieById(req.params.id);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }    
}

const updateMovie = async(req, res) => {
    try{
        const response = await movieService.updateMovie(req.params.id, req.body, req.user);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }  
}

const deleteMovie = async(req, res)=>{
    try{
        const response = await movieService.deleteMovie(req.params.id, req.user);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }  
}

const getTheatresList = async(req, res)=>{
    try{
        const response = await movieService.getTheatresList(req.params.id);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }  
}


module.exports = {getAllMovies, createMovie, getMovieById, updateMovie, deleteMovie, getTheatresList};