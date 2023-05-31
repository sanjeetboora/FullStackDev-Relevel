const ticketController = require('../controllers/ticket.controller');
const authValidators = require("../moddlewares/auth.validator");

module.exports = function(app){
    app.post('/crmapp/api/v1/ticket/', authValidators.isUserAuthenticated, ticketController.createTicket);

    //get all tickets assigned to current user
    app.get('/crmapp/api/v1/getMyAssignedTickets/', authValidators.isUserAuthenticated, ticketController.getMyAllAssignedTickets);


    //get all tickets created by current user
    app.get('/crmapp/api/v1/getMyCreatedTickets/', authValidators.isUserAuthenticated, ticketController.getMyAllCreatedTickets);

    //get all //every type of user can get all the tickets, but customer will get all the tickets which has clientName as user's clientName
    app.get('/crmapp/api/v1/ticket/', authValidators.isUserAuthenticated, ticketController.getAllTicktes);


    //get all tickets by status //only admin and engineer can get all the tickets
    app.get('/crmapp/api/v1/ticketbystatus/:status', authValidators.isUserAuthenticated, authValidators.isAdminOrEngineer, ticketController.getAllTicketsByStatus);


    //get all details of one ticket by id
    app.get('/crmapp/api/v1/ticket/:id', authValidators.isUserAuthenticated, ticketController.getOneTicket);


    //patch => update the ticket by id
    app.patch('/crmapp/api/v1/ticket/:id', authValidators.isUserAuthenticated, ticketController.updateTicketById);

}
