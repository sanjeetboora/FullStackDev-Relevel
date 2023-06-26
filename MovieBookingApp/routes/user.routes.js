const userController = require('../controllers/user.controller');
const {verifyUserWithToken, isAdmin} = require('../middlewares/auth/authJwtToken');

module.exports = function(app){
    
    //update user's information
    app.put('/mba/api/v1/users/:id', [verifyUserWithToken], userController.updateUser);

    //update user's password
    app.put('/mba/api/v1/users/:id/updatePassword', [verifyUserWithToken], userController.updateUserPassword);

     //get all users => only admin can use this api
     app.get('/mba/api/v1/users/', [verifyUserWithToken, isAdmin], userController.getAllUsers);
}