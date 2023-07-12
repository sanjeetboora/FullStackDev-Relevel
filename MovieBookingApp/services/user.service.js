const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const {userTypes}  = require('../utils/constants');
const {sendEmail} = require('../utils/notificationClient');
const {mailTemplate} = require('../utils/notificationMailTemplate');

const updateUserPassword = async(currentUser, userId, data) =>{
    try{ 
        const user = await User.findOne({_id: userId});
        /**
             * Admin can update their own information
             * Admin can update any other user's information
             * User with any role apart from admin can update their own information only.
             * User with any role apart from admin cannot update anyone else's information.
             */
        if(currentUser.userType != userTypes.admin && currentUser._id.toString() != user._id.toString()){
            throw new Error(`current user with the userType: ${currentUser.userType} is not allowed to change the information of other users`);
        }
        if(!data.oldPassword){
            throw new Error("Old password is not provided");
        }
        else if(data.oldPassword == data.newPassword){
            throw new Error("Old password and new password are expected to be different");
        }

        const isValidPassword= bcrypt.compareSync(data.oldPassword, user.password);
        if(!isValidPassword){
            throw new Error("Invalid old password");
        }else{
            user.password = bcrypt.hashSync(data.newPassword, 8);
            const updatedUser = await User.findByIdAndUpdate({_id: userId}, user, {new: true});
            let requesterEmail;
            //admin is updating any other user's information
            if(currentUser.userType == userTypes.admin && user.userType != userTypes.admin){    
                requesterEmail = currentUser.email;
            }else{
                //user updating their own information
                requesterEmail = updatedUser.email;
            }
            const emailContent = mailTemplate(updatedUser.name, `password has been updated for email ${updatedUser.email} successfully.`, "");
            sendEmail(
                "Password updated", 
                emailContent, 
                updatedUser.email,
                requesterEmail,
                updatedUser._id.toString()
            );
            return updatedUser;
        }
    }catch(err){
        return {
            error: err.message
        }
    }
}


const updateUser = async(currentUser, userId, data) =>{
    try{
        const user = await User.findOne({_id: userId});
        //to check if user exists
        if(!user){
            throw new Error("user doesn't exist!");
        }

        /**
         * Admin can update their own information
         * Admin can update any other user's information
         * User with any role apart from admin can update their own information only.
         * User with any role apart from admin cannot update anyone else's information.
         */
        if(currentUser.userType != userTypes.admin && currentUser._id.toString() != user._id.toString()){
            throw new Error(`current user with the userType: ${currentUser.userType} is not allowed to change the information of other users`);
        }

        /**
         * If userType is getting updated, then only admin can update it
         */
        if(data.userType && data.userType!= user.userType && currentUser.userType != userTypes.admin){
            throw new Error(`current user with the userType: ${currentUser.userType} is not allowed to change the userType`);
        }  
        
        /**
         * If userStatus is getting updated, then only admin can update it
         */
        if(data.userStatus && data.userStatus!= user.userStatus && currentUser.userType != userTypes.admin){
            throw new Error(`current user with the userType: ${currentUser.userType} is not allowed to change the userStatus`);
        }  

        user.name = data.name || user.name;
        user.email = data.email || user.email;
        user.username = data.username || user.username;
        user.userStatus = data.userStatus || user.userStatus;
        user.userType = data.userType || user.userType;

        const updatedUser = await User.findByIdAndUpdate({_id: userId}, user, {new: true});
        //admin is updating any other user's information
        if(currentUser.userType == userTypes.admin && user.userType != userTypes.admin){    
            requesterEmail = currentUser.email;
        }else{
            //user updating their own information
            requesterEmail = updatedUser.email;
        }
        const emailContent = mailTemplate(updatedUser.name, `your profile has been updatedsuccessfully.`, `Profile Information: ${updatedUser}`);       
        sendEmail(
            "Your profile updated", 
            emailContent, 
            updatedUser.email,
            updatedUser.email,
            updatedUser._id.toString()
        );
        return updatedUser;

    }catch(err){
        return {
            error: err.message
        }
    }
}

const getAllUsers = async() =>{
    try{
        const users = await User.find();
        return users

    }catch(err){
        return {
            error: err.message
        }
    }
}

module.exports = {updateUser, getAllUsers, updateUserPassword};