const authController = require('../controllers/auth.controller');

module.exports = function(app){
    //signup or register new user
    app.post('/mba/api/v1/auth/signup', authController.signup);

     //signin the user
     app.post('/mba/api/v1/auth/signin', authController.signin);
}