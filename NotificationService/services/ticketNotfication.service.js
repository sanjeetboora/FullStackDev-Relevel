const TicketNotification = require('../models/ticketNotification.model');

const createTicketNotification = async (data) =>{
    try{
        const ticketNotificationObj = {
            subject: data.subject,
            content: data.content,
            recepientEmails: data.recepientEmails,
            requester: data.requester,
            ticketId:data.ticketId,
        }

        const notification = await TicketNotification.create(ticketNotificationObj);
        return {
            notification: notification
        }
    }
    catch(err){
        console.log(err.message);
        return err.message;
    }
}

const getAllUnsentNotifications = async() =>{
    try{
        const unsentNotifications = await TicketNotification.find({
            sentStatus: "UNSENT"
        });
        return unsentNotifications;
    }
    catch(err){
        console.log(err.message);
        return err.message;
    }
}

const setStatusSent = async(notification) =>{
    try{
        const update = notification;
        update.sentStatus = "SENT";
        await TicketNotification.updateOne({id: notification._id}, update);
    }
    catch(err){
        console.log(err.message);
        return err.message;
    }
}


module.exports = {createTicketNotification, getAllUnsentNotifications, setStatusSent};