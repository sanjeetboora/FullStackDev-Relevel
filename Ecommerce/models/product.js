'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // A product belongs to one category
      this.belongsTo(models.Category, {
        foreignKey:{
          name: 'categoryId'
        }
      });

      //A product belong to many orders
      this.belongsToMany(models.Order, {
        through: models.Order_Product,
        foreignKey: 'productId',
        otherKey: 'orderId'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};