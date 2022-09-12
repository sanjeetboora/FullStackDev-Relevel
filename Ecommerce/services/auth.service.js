const {User} = require('../models/index');
const bcrypt = require('bcryptjs');

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

module.exports = {signup, getUserByEmail, verifyPassword};