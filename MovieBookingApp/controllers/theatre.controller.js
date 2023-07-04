const theatreService = require('../services/theatre.service');


const getAllTheatres = async(req, res) => {
    try{
        const response = await theatreService.getAllTheatres(req.query);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }     
}

const createTheatre = async(req, res) =>{
    try{
        const response = await theatreService.createTheatre(req.body, req.user);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    } 
}

const getTheatreById = async(req, res) =>{
    try{
        const response = await theatreService.getTheatreById(req.params.id);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    } 
}

const updateTheatre = async(req, res) =>{
    try{
        const response = await theatreService.updateTheatre(req.params.id, req.body);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: response.error
        })
    } 
}

const deleteTheatre = async(req, res) =>{
    try{
        const response = await theatreService.deleteTheatre(req.params.id);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    } 
}

const updateMoviesInTheatre = async(req, res)=>{
    try{
        const response = await theatreService.updateMoviesInTheatre(req.params.id, req.body);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }  
}

const checkMovieInATheatre = async(req, res)=>{
    try{
        const response = await theatreService.checkMovieInATheatre(req.params.theatreId, req.params.movieId);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }  
}

module.exports = {getAllTheatres, createTheatre, getTheatreById, updateTheatre, deleteTheatre, updateMoviesInTheatre, checkMovieInATheatre}

