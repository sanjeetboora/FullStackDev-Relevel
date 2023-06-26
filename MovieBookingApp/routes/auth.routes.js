const authController = require('../controllers/auth.controller');
const {verifySignInRequestBody, verifySignUpRequestBody} = require('../middlewares/auth/requestValidators');

module.exports = function(app){
    //signup or register new user
    app.post('/mba/api/v1/auth/signup', [verifySignUpRequestBody], authController.signup);

     //signin the user
     app.post('/mba/api/v1/auth/signin', [verifySignInRequestBody], authController.signin);
}