const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {userTypes, userStatus} = require('../utils/constants');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../configs/auth.config');
const {sendEmail} = require('../utils/notificationClient');
const {mailTemplate} = require('../utils/notificationMailTemplate');

const signup = async(userData) => {
    try{
        let userStatusData = userData.userStatus;
        if(!userStatusData){
            //in either of these cases, userType is going to be customer
            if(!userData.userType || userData.userType == userTypes.customer){
                userStatusData = userStatus.approved
            }else{
                //in case if userType is not customer, then userstatus should be pending
                userStatusData = userStatus.pending
            }
        }

        const userObj = {
            name: userData.name,
            email: userData.email,
            username: userData.username,
            password: bcrypt.hashSync(userData.password, 8),
            userType: userData.userType,
            userStatus: userStatusData,
        }

        const user = await User.create(userObj);
        const emailContent = mailTemplate(user.name, `your profile is created successfully.`, `Profile Information: ${user}`);
    
        sendEmail(
            "You are signed up successfully ", 
            emailContent, 
            user.email,
            user.email,
            user._id.toString()
        );
        return user;

    }catch(err){
        return {
            error: err.message
        }
    }
}

const signin = async(userData) => {
    try{
        const user = await User.findOne({email: userData.email});
        // to check if user exists
        if(!user){
            throw new Error("user doesn't exist!");
        }

        // to check if user's status is approved
        if(user.userStatus != userStatus.approved){
            throw new Error(`user is not allowed to login, as user is in status: [ ${user.userStatus} ]`);
        }

        // to check user's password
        const isValidPassword= bcrypt.compareSync(userData.password, user.password);
        if(!isValidPassword){
            throw new Error("Invalid password");
        }

        const accessToken = jwt.sign({ userId: user._id, email: user.email }, secretKey);
        const response = {
            name: user.name,
            email: user.email,
            username: user.username,
            userType: user.userType,
            userStatus: user.userStatus,
            token: accessToken
        }
        return response;
    }catch(err){
        return {
            error: err.message
        }
    }
}

module.exports = {signup, signin}