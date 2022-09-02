const {createNewCategory, getAllCategories} = require('../services/category.service');

const getCategories = async(req, res) =>{
    const allCategoriesData = await getAllCategories();
    return res.json({
        message: 'Successfully fetched the categories',
        success: true,
        code: 200,
        data:allCategoriesData
    });
}

const createCategory = async(req, res) =>{
    const response = await createNewCategory(req.body);
    return res.json({
        message: 'Successfully created the category',
        success: true,
        code: 201,
        data:response
    });
}

module.exports = {
    createCategory,
    getCategories
}