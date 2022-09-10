const authController = require('../controllers/auth.controller');

const routes = (app) =>{
    /* route for sign up*/
    app.post('/ecomm/api/v1/signup', authController.signup);

}

module.exports = routes;