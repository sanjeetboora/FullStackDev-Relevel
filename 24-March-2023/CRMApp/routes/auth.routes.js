const authController = require("../controllers/auth.controller");

module.exports = function(app){

    app.post("/crmapp/api/v1/auth/signup", authController.signup);
    
}