const CategoryController = require('../controllers/category.controller');

const routes = (app) =>{
    /* to get all the categories */
    app.get('/ecomm/api/v1/categories', CategoryController.getCategories);

    /* to create a new category */
    app.post('/ecomm/api/v1/categories', CategoryController.createCategory)
}

module.exports = routes;




