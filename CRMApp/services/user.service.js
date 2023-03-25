const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const createUser = async(data) =>{
    const response = {};
    try{
        const userObj = {
            name: data.name,
            email: data.email,
            userType: data.userType,
            password: data.password,
            userStatus: data.userStatus,
        }
        response.user = await User.create(userObj);
        return response;
    }catch(err){
        console.log("Error: ", err);
        response.error = err.message;
        return response;
    }
}

const verifyUser = async(data) =>{
    const response = {};
    try{
        const userData = await User.findOne({email: data.email});
        if(userData === null){//email not found
            response.error = "Invalid Email";
        }else{//email found
            const result = bcrypt.compareSync(data.password, userData.password);
            if(result){
                response.success = true;
            }else{
                response.error = "Invalid Password";
            }
        }
        return response;
    }catch(err){
        console.log("Error: ", err);
        response.error = err.message;
        return response;
    }
}

module.exports = {createUser, verifyUser}