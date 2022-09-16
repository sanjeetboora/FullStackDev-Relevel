const {Role, User} = require('../models/index');
//unique field for user
//unique field for role
const addRoleToUser = async(userId, roleId) =>{
    try{
        const user = await User.findByPk(userId);
        const role = await Role.findByPk(roleId);
        await user.addRole(role);
        return user;
    }
    catch(err){
        console.log(err);
    }
}

const removeRoleFromUser = async(userId, roleId) =>{
    try{
        const user = await User.findByPk(userId);
        const role = await Role.findByPk(roleId);
        await user.removeRole(role);
        return user;
    }
    catch(err){
        console.log(err);
    }
}

const getRoleById = async(id) =>{
    try{
        const response = await Role.findByPk(id);
        return response;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {addRoleToUser, removeRoleFromUser, getRoleById};
