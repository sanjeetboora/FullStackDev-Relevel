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

// const message = {
//     from: EMAIL_ADDRESS,
//     to: EMAIL_ADDRESS,
//     subject: "Message title",
//     text: "Plaintext version of the message",
//     html: "<p>HTML version of the message</p>"
// };
// transporter.sendMail(message, (err, info) =>{
//     if(err){
//         console.log("error: ", err);
//     }else{
//         console.log("info: ", info);
//     }
// });


module.exports = transporter;