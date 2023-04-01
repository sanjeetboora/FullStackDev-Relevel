const ticketController = require('../controllers/ticket.controller');
const authValidators = require("../moddlewares/auth.validator");

module.exports = function(app){
    app.post('/crmapp/api/v1/ticket/', authValidators.isUserAuthenticated, ticketController.createTicket);

    //get all tickets assigned to current user


    //get all tickets created by current user



    //get all  //only admin can get all the tickets



    //get all tickets by status //only admin can get all the tickets



    //get all details of one ticket by id
    app.get('/crmapp/api/v1/ticket/:id', authValidators.isUserAuthenticated, ticketController.getOneTicket);

}
