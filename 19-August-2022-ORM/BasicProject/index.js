const express = require('express');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');

const sequelizeObj = new Sequelize({
    dialect: 'mysql',
    database: 'Users',
    username: 'root',
    password: 'mysql',
    host: 'localhost',
    port: 3306,
});

//console.log(sequelizeObj);

async function connectDb(){
    try {
        /* authenticate function will check if we are connected to mysql server successfully */
        await sequelizeObj.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.info("this is information");
        console.log("this is logging")
        console.error('Unable to connect to the database:', error);
    }
}
connectDb();


const ProductObj = sequelizeObj.define('Product' /*model name*/, {
    // Model attributes are defined here
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
    }
  }, {
    // Other model options go here
});

async function addData(){
    try{
        //console.log("product", ProductObj);
        /* sync function will create new tables, it will drop the tables if they existed earlier*/
        await sequelizeObj.sync({ force: true });
         /* create function will add entries to your products table */
        let myProduct = await ProductObj.create({name: "Pen", description:"This is a pen"});
        //console.log("myProduct",myProduct);
        /* findAll function will return all entries to your products table */
        let data = await ProductObj.findAll();
        console.log("data",data);
    }
    catch(err){
        console.error("something went wrong", err);
    }
    
}
addData();

// CREATE TABLE user (
// 	id INT NOT NULL,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(150),
//     createdAt DATETIME DEFAULT NOW()
// );