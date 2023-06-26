const userService = require('../services/user.service');

const updateUser = async(req, res)=>{
    try{
        const response = await userService.updateUser(req.user, req.params.id, req.body);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }  
}

const getAllUsers = async(req, res)=>{
    try{
        const response = await userService.getAllUsers();
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }  
}

const updateUserPassword = async(req, res)=>{
    try{
        const response = await userService.updateUserPassword(req.user, req.params.id, req.body);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(200).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }  
}

module.exports = {updateUser, getAllUsers, updateUserPassword}