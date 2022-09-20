const OrderController = require('../controllers/order.controller');
const AuthenticationMiddleWare = require('../middlewares/authentication.validators')

const routes = (app) => {
    //to add products to order
    app.post('/ecomm/api/v1/addProduct',AuthenticationMiddleWare.isAuthenticated, OrderController.addProduct);

    //to remove products from order
    app.patch('/ecomm/api/v1/removeProduct',AuthenticationMiddleWare.isAuthenticated, OrderController.removeProduct);

}

module.exports = routes;