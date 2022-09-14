const {Role, User} = require('../models/index');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = (data) =>{
    const response = User.create({
        username: data.username,
        email: data.email,
        password: data.password,
    })
    return response;
}

const getUserByEmail = (data) =>{
    const response = User.findOne({
        where:{
            email:data
        }
    });
    return response;
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

//unique field for user
//unique field for role
const addRoleToUser = async(userId, roleId) =>{
    try{
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        const role = await Role.findOne({
            where: {
                id: roleId
            }
        });
        await user.addRole(role);
        return user;
    }
    catch(err){
        console.log(err);
    }
    
}

module.exports = {signup, getUserByEmail, verifyPassword, verifyToken, addRoleToUser};