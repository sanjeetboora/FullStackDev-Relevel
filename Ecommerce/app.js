const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const {PORT} =  require('./config/serverConfig');
const app = express();

/* app.use() is using the provided middleware for every incoming request to the server*/
/* We need to a body parser middleware, that will help express to read all the query and body params */
app.use(bodyParser.urlencoded({extended: true}));

categoryRoutes(app);
productRoutes(app);
authRoutes(app);

app.listen(PORT, async()=>{
    console.log('server is listening to port: ', PORT);
});


