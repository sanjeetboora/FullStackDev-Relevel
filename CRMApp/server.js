const express = require('express');
const app = express();
const {PORT} = require('./config/server.config');
const {db_uri} = require('./config/db.config');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/ticketNotification.route');
const bodyParser = require('body-parser');
const cronJob =  require('./crons/ticketNotificationCron');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//registring the routes
notificationRoutes(app);


//starting the app to listen the given port 
app.listen(PORT, () => {
    console.log("Application is listening to the port ", PORT);
    
    //connect mongoose with mongo db
    mongoose.connect(db_uri);
    cronJob.start();
})

