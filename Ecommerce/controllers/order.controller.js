const orderService = require('../services/order.service');
const {STATUS} = require('../config/order.constants')


const addProduct = async (req, res) =>{
    //get urser's order which is in creation status
    let order = await orderService.getOrderByUser(req.user, STATUS.CREATION);

    if(!order){ //if no existing order in creation status, then create a new order
        order = await orderService.createOrder(req.user);
    }

    let response = await orderService.addProductToOrder(req.body.productId, order.id);

    if(response){
        return res.json({
            status: 200,
            success: true,
            message: 'Successfully added product to order'
        });
    }
}

module.exports = {addProduct}