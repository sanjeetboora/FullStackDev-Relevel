const nodemailer = require('nodemailer');
const{EMAIL_ADDRESS, EMAIL_PASSWORD, EMAIL_HOST} = require('../config/mailer.config');

const transporter  = nodemailer.createTransport({
    pool: true,
    host: EMAIL_HOST,
    port: 465,
    secure: true, 
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });

const sendNotificationMail = (to, subject, html) =>{
    const message = {
        from: EMAIL_ADDRESS,
        to: to,
        subject: subject,
        html: html,
    };
    transporter.sendMail(message, (err, info) =>{
        if(err){
            console.log("error: ", err);
        }else{
            console.log("info: ", info);
        }
    });
}

module.exports = {sendNotificationMail};

