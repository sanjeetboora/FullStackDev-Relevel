const theatreService = require('../services/theatre.service');


const getAllTheatres = async(req, res) => {
    try{
        const response = await theatreService.getAllTheatres(req.query);
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
        const response = await theatreService.createTheatre(req.body);
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
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    } 
}

const deleteTheatre = async(req, res) =>{
    try{
        const response = await theatreService.deleteTheatre(req.params.id);
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    } 
}

module.exports = {getAllTheatres, createTheatre, getTheatreById, updateTheatre, deleteTheatre}

