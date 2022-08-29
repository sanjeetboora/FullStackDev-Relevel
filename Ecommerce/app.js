const express = require('express');
const categoryRoutes = require('./routes/category.routes');
const {PORT} =  require('./config/serverConfig');
const app = express();

categoryRoutes(app);

app.listen(PORT, ()=>{
    console.log('server is listening to port: ', PORT);
});


