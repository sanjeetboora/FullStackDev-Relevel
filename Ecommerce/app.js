const express = require('express');
const categoryRoutes = require('./routes/category.routes');
const app = express();
const PORT = 3000;

categoryRoutes(app);

app.listen(PORT, ()=>{
    console.log('server is listening to port: ', PORT);
});


