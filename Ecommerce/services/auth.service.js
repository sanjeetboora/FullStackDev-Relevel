const {User} = require('../models/index');
const roleService = require('./role.service');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (data) =>{
    try{
        const user = await User.create({
            username: data.username,
            email: data.email,
            password: data.password,
        });
        const customerRole = await roleService.getRoleByName('customer');

        //assigning the role of customer by default
        await user.addRole(customerRole);
        return user;
    }
    catch(err){
        console.log(err);
    }
}

const verifyPassword = (password, hashedPassword) =>{
    return bcrypt.compareSync(password, hashedPassword);
}

const verifyToken = (token) =>{
    try{
        const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return response;
    }catch(err){
        console.log(err);
    }
}

module.exports = {signup, verifyPassword, verifyToken};