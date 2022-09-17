'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { through: 'User_Roles' });
      this.hasMany(models.Order, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({ //User.init initilaizes User object
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
        len: [5, 20], //password's length can be between 5 to 40 characters
      } 
    },
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  
  /* this beforeCreate is a simple function known as a hook, will be running
  everytime before creating the user object in user table */
  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword; //this line will replace user's actual password with hashed password
  }); 
  
  return User;
};