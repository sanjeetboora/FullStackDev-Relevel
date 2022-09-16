const roleController = require('../controllers/role.controller');

const AuthenticationMiddleWare = require('../middlewares/authentication.validators')

const routes = (app) =>{
     /* route for adding roles */
     app.post('/ecomm/api/v1/role', AuthenticationMiddleWare.isAuthenticated, roleController.addRoleToUser);
     
     /* route for removing roles */
     app.delete('/ecomm/api/v1/role', AuthenticationMiddleWare.isAuthenticated, roleController.removeRoleFromUser);

    }

module.exports = routes;
