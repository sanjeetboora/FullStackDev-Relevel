const Ticket = require('../models/ticket.model');

const createTicket = async(data, userData) =>{
    try{
        const ticketObj = {
            title: data.title,
            description: data.description,
            status: data.status,
            ticketPriority: data.ticketPriority,
            assignee:data.assignee,
            assignedTo:data.assignedTo,
            clientName:data.clientName,
            createdBy: userData.email,  
        }
        const ticketResponse = await Ticket.create(ticketObj);
        if(ticketResponse){
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