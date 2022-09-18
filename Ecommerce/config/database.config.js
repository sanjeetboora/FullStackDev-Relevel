require('dotenv').config();

const databasePassword = process.env.DEVELOPMENT_DATABASE_PASSWORD;

module.exports = {
    "development": {
      "username": "root",
      "password": databasePassword,
      "database": "ecommerce_development_database",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  
