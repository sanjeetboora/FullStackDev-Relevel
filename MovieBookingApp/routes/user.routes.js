const userController = require('../controllers/user.controller');
const {verifyUserWithToken, isAdmin, isUserStatusApproved} = require('../middlewares/auth/authJwtToken');
const {verifyUpdatePasswordRequest, verifyUpdateUserInformationRequest} = require('../middlewares/user/requestValidators');

module.exports = function(app){
    
    //update user's information
    app.put('/mba/api/v1/users/:id', [verifyUpdateUserInformationRequest, verifyUserWithToken, isUserStatusApproved], userController.updateUser);

    //update user's password
    app.put('/mba/api/v1/users/:id/updatePassword', [verifyUpdatePasswordRequest, verifyUserWithToken, isUserStatusApproved], userController.updateUserPassword);

    //get all users => only admin can use this api
    app.get('/mba/api/v1/users/', [verifyUserWithToken, isUserStatusApproved, isAdmin], userController.getAllUsers);
}