const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const {userTypes, userStatus}  = require('../utils/constants');

const updateUserPassword = async(currentUser, userId, data) =>{
    try{ 
        const user = await User.findOne({_id: userId});
        /**
             * Admin can update their own information
             * Admin can update any other user's information
             * User with any role apart from admin can update their own information only.
             * User with any role apart from admin cannot update anyone else's information.
             */
        if(currentUser.userType != userTypes.admin && currentUser._id != user._id){
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
        if(currentUser.userType != userTypes.admin && currentUser._id != user._id){
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