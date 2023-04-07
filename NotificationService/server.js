const express = require('express');
const app = express();
const {PORT} = require('./config/server.config');
const {db_uri} = require('./config/db.config');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/ticketNotification.route');
const bodyParser = require('body-parser');
const transporter = require('./notifier/mailerService');
const nodemailer = require('nodemailer');
const{EMAIL_ADDRESS} = require('./config/mailer.config');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//registring the routes
notificationRoutes(app);


//starting the app to listen the given port 
app.listen(PORT, () => {
    console.log("Application is listening to the port ", PORT);
    
    //connect mongoose with mongo db
    mongoose.connect(db_uri);
    sendMyMail();

    // //to verify if transporter is working or not
    // transporter.verify(function (error, success) {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log("Server is ready to take our messages", success);
    //     }
    //   });
})


function sendMyMail(){
    const message = {
        from: EMAIL_ADDRESS,
        to: EMAIL_ADDRESS,
        subject: "Message title",
        text: "Plaintext version of the message",
        html: "<p>HTML version of the message</p>"
    };
    transporter.sendMail(message, (err, info) =>{
        if(err){
            console.log("error: ", err);
        }else{
            console.log("info: ", info);
        }
    });
}