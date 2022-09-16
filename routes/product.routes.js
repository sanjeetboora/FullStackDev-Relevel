const ProductController = require('../controllers/product.controller');
const AuthenticationMiddleWare = require('../middlewares/authentication.validators')

/* this function will have all the routes of products api*/
const routes = (app) => {
    /* to get all the products */
    app.get('/ecomm/api/v1/products', ProductController.getProducts);

    /* to get all the products with Categories*/
    app.get('/ecomm/api/v1/productsWithCategories', ProductController.getProductsWithCategories);

    /* to create a product*/
    app.post('/ecomm/api/v1/products', AuthenticationMiddleWare.isAuthenticated, AuthenticationMiddleWare.checkAdminOrSeller, ProductController.createProduct);

    /* to update a product*/
    app.put('/ecomm/api/v1/products/:productId',  AuthenticationMiddleWare.isAuthenticated, AuthenticationMiddleWare.checkAdminOrSeller, ProductController.updateProduct);
    
    /* to delete a product*/
    app.delete('/ecomm/api/v1/products/:productId', AuthenticationMiddleWare.isAuthenticated, AuthenticationMiddleWare.checkAdminOrSeller, ProductController.deleteProduct);

    /* to get all products by a categoryId */
    app.get('/ecomm/api/v1/products/:categoryId', ProductController.getAllProductsByCategoryId);

    /* to get all products in the cost range*/
    app.get('/ecomm/api/v1/productsByCostRange/', ProductController.getProductsByCostRange);

}

module.exports = routes;

