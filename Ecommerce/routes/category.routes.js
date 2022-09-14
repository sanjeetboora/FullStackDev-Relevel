const CategoryController = require('../controllers/category.controller');
const CategoryMiddleware = require('../middlewares/category.validators')
const AuthenticationMiddleWare = require('../middlewares/authentication.validators')

const routes = (app) =>{
    /* to get all the categories */
    app.get('/ecomm/api/v1/categories', CategoryController.getCategories);

    /* to create a new category */
    app.post('/ecomm/api/v1/categories', AuthenticationMiddleWare.isAuthenticated, CategoryMiddleware.validateCreate, CategoryController.createCategory)

    /* to get all categories by id */
    app.get('/ecomm/api/v1/categories/:id', CategoryController.getCategoriesById);

    /* to get all categories by name */
    app.get('/ecomm/api/v1/categoriesByName/', CategoryController.getCategoriesByName);

    /* to update the category by given id */
    app.put('/ecomm/api/v1/categories/:id', AuthenticationMiddleWare.isAuthenticated,CategoryController.updateCategory);

    /* to delete a category by id */
    app.delete('/ecomm/api/v1/categories/:id', AuthenticationMiddleWare.isAuthenticated,CategoryController.deleteCategory)
}

module.exports = routes;
