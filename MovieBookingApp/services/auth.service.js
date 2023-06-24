const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {userTypes, userStatus} = require('../utils/constants')


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
            passowrd: bcrypt.hashSync(userData.passowrd, 8),
            userType: userData.userType,
            userStatus: userStatusData,
        }

        const user = await User.create(userObj);
        return user;

    }catch(err){
        return {
            error: err.message
        }
    }
}

module.exports = {signup}