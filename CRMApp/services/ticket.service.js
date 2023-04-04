const Ticket = require('../models/ticket.model');
const User = require('../models/user.model');
const UserService = require('./user.service');
const mongoose = require('mongoose');

const createTicket = async(data, userData) =>{
    try{
        const validateAssignedTo = data.assignedTo? await UserService.isValidActiveUser({email: data.assignedTo}) : true;
        if(validateAssignedTo.error){
            return {
                error:{
                    assignedTo: validateAssignedTo.error 
                }
            }
        }
        const ticketObj = {
            title: data.title,
            description: data.description,
            status: data.status,
            ticketPriority: data.ticketPriority,
            assignee:userData.email,
            assignedTo:data.assignedTo,
            clientName:data.clientName,
            createdBy: userData.email,  
        }
        const ticketResponse = await Ticket.create(ticketObj);
        if(ticketResponse){
            //store this ticket for user too
            const userResponse = await UserService.addNewTicketCreatedByUser(userData.email, ticketResponse._id);
            if( userResponse.error){
                return {
                    error: userResponse.error
                }
            }
            if(data.assignedTo) {
                const response = await UserService.addTicketAssignedToUser(data.assignedTo, ticketResponse._id);
                if( response.error){
                    return {
                        error: response.error
                    }
                }
            }
            return ticketResponse;
        }
        else{
            return {
                error: "server error occurred"
            }
        }
    }
    catch(err){
        console.log(err);
        return err.message;
    }
}

const getOneTicket = async(data) => {
    try{
        const response =  await UserService.validateTicketId(data.id);
        if( response.error){
            return {
                error: response.error
            }
        }
        return response;
    }
    catch(err){
        console.log(err);
        return err.message;
    }

}

const getAllTicktes = async() =>{
    try{
        const response = await Ticket.find();
        return response;
    }
    catch(err){
        console.log(err);
        return err.message;
    }
}

const getAllTicketsByStatus = async(data) =>{
    try{
        const response = await Ticket.find({status: data.status});
        return response;
    }
    catch(err){
        console.log(err);
        return err.message;
    }
}

const updateTicketById = async(ticketIdInfo, ticketInfo, currentUser) =>{
    try{
        const validateTicket = await UserService.validateTicketId(ticketIdInfo.id);
        if(!validateTicket || validateTicket.error){
            return {
                error: "invalid ticket id"
            }
        }

        const filter = { _id: ticketIdInfo.id };
        const update = ticketInfo;
        if(update.assignee && update.assignee != currentUser.email){
            return {
                error: "assignee is invalid"
            }
        }

        if(update.assignedTo && UserService.isValidActiveUser(update.assignedTo)){
            update.assignee = currentUser.email;
        }else{
            return {
                error: "Invalid assignedTo user"
            }
        }

        //previousAssignedToUser
        await User.findOneAndUpdate({email:validateTicket.assignedTo}, {
            $pull:{
                ticketsAssigned: validateTicket._id
            }
        })

        //newAssignedToUser 
        await User.findOneAndUpdate({email:update.assignedTo}, {
            $push:{
                ticketsAssigned: validateTicket._id
            }
        })

        const response = await Ticket.findOneAndUpdate(
            filter, 
            update,
            {
                new: true // return the updated document
            }
        );
       
        return response;
    }
    catch(err){
        console.log(err);
        return err.message;
    }
}

module.exports = {createTicket, getOneTicket, getAllTicktes, getAllTicketsByStatus,updateTicketById};