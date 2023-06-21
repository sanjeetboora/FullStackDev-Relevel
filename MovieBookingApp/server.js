const {PORT} = require('./configs/server.config');
const {DB_NAME, DB_URL} = require('./configs/db.config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');

//Initialize the app
const app = express();

//Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Connect to mongo db
mongoose.connect(DB_URL).catch(error => console.log("couldn't connect to mongodb: ",error));

//Call the routes
movieRoutes(app);
theatreRoutes(app);

//Start the server
app.listen(PORT, ()=>{
    console.log('App is listening to the port: ', PORT);
})