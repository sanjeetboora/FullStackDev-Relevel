const User = require("../models/user.model");

const createUser = async(data) =>{
    try{
        const userObj = {
            name: data.name,
            email: data.email,
            userType: data.userType,
            password: data.password,
            userStatus: data.userStatus,
        }
        const newUser = await User.create(userObj);
        return newUser;
    }catch(err){
        console.log("Error: ", err);
        return err.message;
    }
}


module.exports = {createUser}