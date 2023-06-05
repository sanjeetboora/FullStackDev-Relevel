const userController = require("../controllers/user.controller");
const authValidators = require("../moddlewares/auth.validator");

module.exports = function(app){
    app.get("/crmapp/api/v1/users/", authValidators.isUserAuthenticated, authValidators.isAdmin, userController.getAllUsers);
    app.get("/crmapp/api/v1/users/:email", authValidators.isUserAuthenticated, authValidators.isAdmin, userController.getUserByEmail);
    app.get("/crmapp/api/v1/user/:userId", authValidators.isUserAuthenticated, authValidators.isAdmin, userController.getUserByUserId);
    app.patch("/crmapp/api/v1/user/updateUserStatus", authValidators.isUserAuthenticated, authValidators.isAdmin, userController.updateUserType);
    app.patch("/crmapp/api/v1/user/updateUser", authValidators.isUserAuthenticated, authValidators.isAdminOrUserSelf, userController.updateUser);

}