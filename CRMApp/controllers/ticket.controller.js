const ticketService = require('../services/ticket.service');
const userService = require('../services/user.service');

const createTicket = async(req, res)=>{
    try{//req.body has ticket's data, req.user => we are getting this data from middleware for current user who sent this request
        const response = await ticketService.createTicket(req.body, req.user);
        if(response.error){
            res.status(401).send( response.error);
        }else{
            res.status(201).send(response)
        }
    }
    catch(err){
        res.status(500).send({
            result: err
        })
    }
}

const getOneTicket =  async(req, res)=>{
    try{//req.body's param has ticket's id
        const response = await ticketService.getOneTicket(req.params);
        if(response.error){
            res.status(401).send(response.error)
        }else{
            res.status(201).send(response)
        }
    }
    catch(err){
        res.status(500).send({
            result: err
        })
    }
}

const getAllTicktes = async(req, res) =>{
    try{
        const response = await ticketService.getAllTicktes(req.user);
        if(response.error){
            res.status(401).send({
                result: response.error
            })
        }else{
            res.status(201).send({
                result: response
            })
        }
    }
    catch(err){
        res.status(500).send({
            result: err
        })
    }
}

const getAllTicketsByStatus = async(req, res) =>{
    try{
        const response = await ticketService.getAllTicketsByStatus(req.params);
        if(response.error){
            res.status(401).send({
                result: response.error
            })
        }else{
            res.status(201).send({
                result: response
            })
        }
    }
    catch(err){
        res.status(500).send({
            result: err
        })
    }
}

const getMyAllAssignedTickets = async(req, res) =>{
    try{
        const response = await userService.getAllAssignedTicketsOfUser(req.user);
        if(response.error){
            res.status(401).send({
                result: response.error
            })
        }else{
            res.status(201).send({
                result: response
            })
        }
    }
    catch(err){
        res.status(500).send({
            result: err
        })
    }
}

const getMyAllCreatedTickets = async(req, res) =>{
    try{
        const response = await userService.getAllCreatedTicketsOfUser(req.user);
        if(response.error){
            res.status(401).send({
                result: response.error
            })
        }else{
            res.status(201).send({
                result: response
            })
        }
    }
    catch(err){
        res.status(500).send({
            result: err
        })
    }
}

const updateTicketById = async(req, res) =>{
    try{
        const response = await ticketService.updateTicketById(req.params, req.body, req.user);
        if(response.error){
            res.status(401).send({
                result: response.error
            })
        }else{
            res.status(201).send({
                result: response
            })
        }
    }
    catch(err){
        res.status(500).send({
            result: err
        })
    }
}

module.exports = {createTicket, getOneTicket,
    getAllTicktes, getAllTicketsByStatus,
     getMyAllAssignedTickets, getMyAllCreatedTickets, updateTicketById}