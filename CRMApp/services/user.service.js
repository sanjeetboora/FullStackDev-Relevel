const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const userConstants = require('../constants/user.constant');

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

const isValidActiveUser = async(data) =>{
    try{
        //get the user by email
        let userInfo= await getUserByEmail(data);
        console.log("==========userInfo======", userInfo);
        if(userInfo && userInfo.userStatus === "approved"){
            return {
                user:userInfo
            };
        }else{
            return {
                error: "invalid user"
            }
        }
    }
    catch(err){
        console.log(err);
        return err.message;
    }
}

const getUserByEmail = async(data) => { 
    try{
        let userInfo= await User.findOne({email: data.email});
        return userInfo;
    }
    catch(err){
        console.log(err);
        return err.message;
    }
}

const getUserByUserId = async(data) => { 
    try{
        let userInfo= await User.findOne({_id: data.userId});
        return userInfo;
    }
    catch(err){
        console.log(err);
        return err.message;
    }
}

const getAllUsers = async() => {
    try{
        let usersInfo= await User.find();
        return usersInfo;
    }
    catch(err){
        console.log(err);
        return err.message;
    }
}


const updateUserType =  async(data) =>{
    try{
        let result;
        if(!(Object.values(userConstants.userTypes).indexOf(data.updates.userType) >= 0)){
            result = {
                error: "invalid user type provided",
            }
            return result;
        }
        
        if(data.userId){
            //update the user status on basis of user id
            await User.findOneAndUpdate({_id:data.userId}, {userType: data.updates.userType});
            result = await User.findOne({_id:data.userId});
        }
        else if(data.email){
            //update the user status on basis of email
            await User.findOneAndUpdate({email:data.email}, {userType: data.updates.userType}); 
            result = await User.findOne({email:data.email});
        }
        else{
            //return error, required fields not provided
            result = {
                error: "required fields are not provided to update the user information",
            }
        }
        return result;
    }
    catch(err){
        console.log(err);
        return err.message;
    }
}

const addNewTicketCreatedByUser = async(userEmail, ticketId) =>{
    try{
        const response = await User.updateOne(
            { email: userEmail }, 
            { $push: { ticketsCreated: ticketId} },
        );
        return response;
    } catch(err){
        console.log(err);
        return err.message;
    }
    
}

module.exports = {createUser, verifyUser, getUserByEmail, getAllUsers, getUserByUserId, updateUserType, isValidActiveUser, addNewTicketCreatedByUser}