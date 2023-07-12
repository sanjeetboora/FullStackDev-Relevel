const { sendNotificationMail } = require('../notifier/mailerService');
const { getAllUnsentNotifications, setStatusSent } = require('../services/ticketNotfication.service');

var CronJob = require('cron').CronJob;
var job = new CronJob(
    '05 * * * * *',
    async function() {
        try{
            console.log('You will see this message every second');
            const unsentNotifications = await getAllUnsentNotifications();
            //for every unsent notification, we will send email
            unsentNotifications.forEach(async(notification) => {
                //for every recepientEmail we will send the emai;l
                notification.recepientEmails.forEach(recepient => {
                    sendNotificationMail(recepient, notification.subject, notification.content)
                });
                await setStatusSent(notification);
            });
        }
        catch(err){
            console.log("Error ", err);
        }
        
    },
    null,
    true,
    'Asia/Kolkata'
);


module.exports = job;
