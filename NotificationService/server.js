const express = require('express');
const app = express();
const {PORT} = require('./config/server.config');
const {db_uri} = require('./config/db.config');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/ticketNotification.route');
const bodyParser = require('body-parser');
const sendgridMail = require('./notifier/mailerService');
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
})


function sendMyMail(){
    const msg = {
        to: EMAIL_ADDRESS, // Change to your recipient
        from: EMAIL_ADDRESS, // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      sendgridMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}