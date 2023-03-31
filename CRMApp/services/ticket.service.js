const Ticket = require('../models/ticket.model');
const UserService = require('./user.service');

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
            await UserService.addNewTicketCreatedByUser(userData.email, ticketResponse._id);
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



module.exports = {createTicket};