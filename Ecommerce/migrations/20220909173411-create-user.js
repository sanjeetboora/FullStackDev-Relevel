'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, //email should not be null
        unique: true, //email should always be unique
        validate: {
          isEmail: true, // to validate the email format is correct
        }  
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [5,40], //password's length can be between 5 to 40 characters
        } 
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};