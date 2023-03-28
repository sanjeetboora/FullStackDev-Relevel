const userController = require("../controllers/user.controller");
const authValidators = require("../moddlewares/auth.validator");

module.exports = function(app){
    app.get("/crmapp/api/v1/users/", authValidators.isUserAuthenticated, userController.getAllUsers);
}