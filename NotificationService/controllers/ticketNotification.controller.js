const ticketNotificationService = require('../services/ticketNotfication.service');

const createTicketNotification = async(req, res) =>{
   try{
        const response = await ticketNotificationService.createTicketNotification(req.body);
        if(response.notification){
            res.status(201).send({
                data: response.notification,
                status: "Notification is created"
            });
        }else{
            res.status(500).send({
                status: "Notification is not created",
                data: response
            });
        }
   }catch(err){
        res.status(500).send({
            error: err
        })
   }
}

module.exports = {createTicketNotification}