const ProductController = require('../controllers/product.controller');

/* this function will have all the routes of products api*/
const routes = (app) => {
    /* to get all the products */
    app.get('/ecomm/api/v1/products', ProductController.getProducts);

}

module.exports = routes;

