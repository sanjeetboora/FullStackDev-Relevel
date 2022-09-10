const {User} = require('../models/index');

const signup = (data) =>{
    const response = User.create({
        username: data.username,
        email: data.email,
        password: data.password,
    })
    return response;
}

module.exports = {signup};