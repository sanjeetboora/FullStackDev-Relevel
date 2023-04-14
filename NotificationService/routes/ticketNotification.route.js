const ticketNotificationController = require('../controllers/ticketNotification.controller');

module.exports = function(app){
    // to create a notification
    app.post('/notificationService/api/v1/notification', ticketNotificationController.createTicketNotification);
}