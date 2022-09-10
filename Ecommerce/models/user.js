'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email:{ /* constraints are being checked at mysql level in the db*/
      type: DataTypes.STRING,
      allowNull: false, //email should not be null
      unique: true,
      validate: {/* validations are being validated at sequelize level in the project */
        isEmail: true, // to validate the email format is correct
      }  
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,40], //password's length can be between 5 to 40 characters
      } 
    },
    username: DataTypes.STRING
    

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};