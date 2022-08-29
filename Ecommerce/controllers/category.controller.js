const {getAllCategories} = require('../services/category.service');

const getCategories = async(req, res) =>{
    const allCategoriesData = await getAllCategories();
    return res.json({
        message: 'Successfully fetched the categories',
        success: true,
        code: 200,
        data:allCategoriesData
    });
}

module.exports = {
    getCategories
}