const {Product} = require("../models/index")

const getAllProducts = async() =>{
    const response = await Product.findAll();
    return response;
}

module.exports = {getAllProducts}