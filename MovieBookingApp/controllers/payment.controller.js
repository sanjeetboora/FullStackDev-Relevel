const paymentService = require('../services/payment.service');

const getAllPayments = async(req, res) =>{
    try{
        const response = await paymentService.getAllPayments();
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

const createPayment = async(req, res) =>{
    try{
        const response = await paymentService.createPayment(req.body);
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

const updatePayment = async(req, res) =>{
    try{
        const response = await paymentService.updatePayment(req.params.id, req.body);
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

const getPaymentByPaymentId = async(req, res) =>{
    try{
        const response = await paymentService.getPaymentByPaymentId(req.params.id);
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

const getPaymentByBookingId= async(req, res) =>{
    try{
        const response = await paymentService.getPaymentByBookingId(req.params.id);
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

module.exports = {getAllPayments, createPayment, updatePayment, getPaymentByPaymentId, getPaymentByBookingId}