const ticketController = require('../controllers/ticket.controller');
const authValidators = require("../moddlewares/auth.validator");

module.exports = function(app){
    app.post('/crmapp/api/v1/ticket/', authValidators.isUserAuthenticated, ticketController.createTicket);

    //get all tickets assigned to current user
    app.get('/crmapp/api/v1/getMyAssignedTickets/', authValidators.isUserAuthenticated, ticketController.getMyAllAssignedTickets);


    //get all tickets created by current user


    //get all //only admin can get all the tickets
    app.get('/crmapp/api/v1/ticket/', authValidators.isUserAuthenticated, authValidators.isAdmin, ticketController.getAllTicktes);


    //get all tickets by status //only admin can get all the tickets
    app.get('/crmapp/api/v1/ticketbystatus/:status', authValidators.isUserAuthenticated, authValidators.isAdmin, ticketController.getAllTicketsByStatus);


    //get all details of one ticket by id
    app.get('/crmapp/api/v1/ticket/:id', authValidators.isUserAuthenticated, ticketController.getOneTicket);


    //patch => update the ticket by id
    app.patch('/crmapp/api/v1/ticket/:id', authValidators.isUserAuthenticated, ticketController.updateTicketById);

}
