const {PORT} = require('./configs/server.config');
const {DB_NAME, DB_URL} = require('./configs/db.config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bookingRoutes = require('./routes/booking.routes');
const paymentRoutes = require('./routes/payment.routes');
const showroomRoutes = require('./routes/showroom.routes');

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
authRoutes(app);
userRoutes(app);
bookingRoutes(app);
paymentRoutes(app);
showroomRoutes(app);

//Start the server
app.listen(PORT, ()=>{
    console.log('App is listening to the port: ', PORT);
})