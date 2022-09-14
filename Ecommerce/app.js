const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const {PORT} =  require('./config/serverConfig');
const {User, Role, sequelize} = require('./models/index');
const app = express();

/* app.use() is using the provided middleware for every incoming request to the server*/
/* We need to a body parser middleware, that will help express to read all the query and body params */
app.use(bodyParser.urlencoded({extended: true}));

categoryRoutes(app);
productRoutes(app);
authRoutes(app);

app.listen(PORT, async()=>{
    await sequelize.sync(); // this to sync all the models (it will create the through table User_Roles in db)
    
    // const myUser = await User.create({
    //     username: "daniel",
    //     email: "daniel@gmail.com",
    //     password: "danieldaniel",
    // })

    // const adminRole = await Role.findOne({
    //     where:{
    //         name:'admin'
    //     }
    // });

    // const response = await myUser.addRole(adminRole);
    
    const myResponse = await User.findOne({
        where: {
            username: 'daniel'
        },
        raw:true,
        nest: true,
        include: Role
    })
    console.log(myResponse);

    console.log('server is listening to port: ', PORT);
});


