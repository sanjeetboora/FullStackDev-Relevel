const roleService = require('../services/role.service');

const addRoleToUser = (req, res) =>{
    let response = roleService.addRoleToUser(req.body.userId, req.body.roleId);
    if(response){
        return res.json({
            message: 'Role is added successfully',
            success: true,
            code: 200,
            data: response,
        });
    }
    else{
        return res.json({
            message: 'Internal server error',
            success: true,
            code: 500,
        });
    }
}

const removeRoleFromUser = async(req, res) =>{
    const response = await roleService.removeRoleFromUser(req.body.userId, req.body.roleId);
    if(response){
        return res.json({
            message: 'Role is removed successfully',
            success: true,
            code: 200,
            data: response,
        });
    }
    else{
        return res.json({
            message: 'Internal server error',
            success: true,
            code: 500,
            err: response
        });
    }

}

module.exports = {addRoleToUser, removeRoleFromUser}