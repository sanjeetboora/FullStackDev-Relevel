'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //An order belong to one user
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });

       //An order has many products
      this.belongsToMany(models.Product, {
        through: models.Order_Product,
        foreignKey: 'orderId',
        otherKey: 'productId',
      })
    }
  }
  Order.init({
    status: DataTypes.STRING,
    delivery: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};