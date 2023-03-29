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

const getUserByEmail = async(data) => { 
    try{
        let userInfo= await User.findOne({email: data.email});
        return userInfo;
    }
    catch(err){
        console.log(err);
        return error.message;
    }
}

const getUserByUserId = async(data) => { 
    try{
        let userInfo= await User.findOne({_id: data.userId});
        return userInfo;
    }
    catch(err){
        console.log(err);
        return error.message;
    }
}

const getAllUsers = async() => {
    try{
        let usersInfo= await User.find();
        return usersInfo;
    }
    catch(err){
        console.log(err);
        return error.message;
    }
}

module.exports = {createUser, verifyUser, getUserByEmail, getAllUsers, getUserByUserId}