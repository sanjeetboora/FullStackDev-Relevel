const {Order, Product} = require('../models/index');
const {STATUS} = require('../config/order.constants');

const getOrderByUser = async (user, orderStatus) =>{
    try {
        const order = await Order.findOne({
            where: {
                userId: user.id,
                status: orderStatus,
            }
        });
        return order;
    }
    catch(err){
        console.log(err);
    }
    
}

const createOrder = async(user) => {
    const order = await Order.create({userId: user.id, status: STATUS.CREATION});
    return order;
}

const addProductToOrder = async(productId, orderId) => {
    const order = await Order.findByPk(orderId);
    const product = await Product.findByPk(productId);
    const entry = await order.addProduct(product, {through : {quantity: 1}});
    return entry;
}


module.exports = {getOrderByUser,createOrder, addProductToOrder}