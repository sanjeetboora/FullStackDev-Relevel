const {Role} = require('../models/index');
const authHelperService =  require('./auth-helper.service');
//unique field for user
//unique field for role
const addRoleToUser = async(userEmail, roleName) =>{
    try{
        const user = await authHelperService.getUserByEmail(userEmail);
        const role = await getRoleByName(roleName);
        await user.addRole(role);
        return user;
    }
    catch(err){
        console.log(err);
    }
}

const removeRoleFromUser = async(userEmail, roleName) =>{
    try{
        const user = await authHelperService.getUserByEmail(userEmail);
        const role = await getRoleByName(roleName);
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

const getRoleByName = async(roleName) =>{
    try{
        const response = await Role.findOne({
            where:{
                name: roleName
            }
        });
        return response;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {addRoleToUser, removeRoleFromUser, getRoleById, getRoleByName};
