const showroomService = require('../services/showroom.service');

const getAllShowrooms = async(req, res) => {
    try{
        const response = await showroomService.getAllShowrooms(req.query);
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

const createShowroom = async(req, res) =>{
    try{
        const response = await showroomService.createShowroom(req.body, req.user);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        };
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    } 
}

const getShowroomById = async(req, res) =>{
    try{
        const response = await showroomService.getShowroomById(req.params.id);
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

const updateShowroom = async(req, res) =>{
    try{
        const response = await showroomService.updateShowroom(req.params.id, req.body);
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

const deleteShowroom = async(req, res) =>{
    try{
        const response = await showroomService.deleteShowroom(req.params.id);
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

module.exports = {getAllShowrooms, createShowroom, getShowroomById, updateShowroom, deleteShowroom}

