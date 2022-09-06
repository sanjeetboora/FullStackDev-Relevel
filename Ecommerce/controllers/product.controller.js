const ProductService = require('../services/product.service')

const getProducts = async(req, res) =>{
    const allProductsData = await ProductService.getAllProducts();
    return res.json({
        message: 'Successfully fetched the products',
        success: true,
        code: 200,
        data: allProductsData
    });
}

module.exports = {getProducts}