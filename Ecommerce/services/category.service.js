const {Category} = require('../models/index');

const getAllCategories = async() =>{
    const allCategoriesData = await Category.findAll();
    return allCategoriesData;
}

module.exports = {getAllCategories};