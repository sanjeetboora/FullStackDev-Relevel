const ticketController = require('../controllers/ticket.controller');
const authValidators = require("../moddlewares/auth.validator");

module.exports = function(app){
    app.post('/crmapp/api/v1/ticket/', authValidators.isUserAuthenticated, ticketController.createTicket);
}
