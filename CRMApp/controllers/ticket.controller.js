const ticketService = require('../services/ticket.service');

const createTicket = async(req, res)=>{
    try{//req.body has ticket's data, req.user => we are getting this data from middleware for current user who sent this request
        const response = await ticketService.createTicket(req.body, req.user);
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

const getOneTicket =  async(req, res)=>{
    try{//req.body's param has ticket's id
        const response = await ticketService.getOneTicket(req.params);
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
module.exports = {createTicket, getOneTicket}