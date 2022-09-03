const CategoryService = require('../services/category.service');

const getCategories = async(req, res) =>{
    const allCategoriesData = await CategoryService.getAllCategories();
    return res.json({
        message: 'Successfully fetched the categories',
        success: true,
        code: 200,
        data:allCategoriesData
    });
}

const createCategory = async(req, res) =>{
    const response = await CategoryService.createNewCategory(req.body);
    return res.json({
        message: 'Successfully created the category',
        success: true,
        code: 201,
        data:response
    });
}

const getCategoriesById = async(req, res) =>{
    const response = await CategoryService.getCategoriesById(req.params.id);
    return res.json({
        message: 'Successfully fetched the categories',
        success: true,
        code: 200,
        data:response
    });
}

const getCategoriesByName = async(req, res) =>{
    const response = await CategoryService.getCategoriesByName(req.query.name);
    return res.json({
        message: 'Successfully fetched the categories',
        success: true,
        code: 200,
        data:response
    });
}

const updateCategory = async(req, res) =>{
    const response = await CategoryService.updateCategory(req.params.id, req.body);
    return res.json({
        message: 'Successfully updated the category',
        success: true,
        code: 201,
        data:response
    });
}


const deleteCategory = async(req, res) =>{
    const response = await CategoryService.deleteCategory(req.params.id);
    return res.json({
        message: 'Successfully deleted the category',
        success: true,
        code: 200,
        data:response
    });
}

module.exports = {
    createCategory,
    getCategories,
    getCategoriesById,
    getCategoriesByName,
    updateCategory,
    deleteCategory
}