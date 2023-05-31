const userService = require("../services/user.service");

const getAllUsers = async(req, res) =>{
   try{
        let response = await userService.getAllUsers();
        res.status(200).send({
            result: response
        })
    }catch(err){
        res.status(500).send({
            result: err
        })
    }
}

const getUserByEmail = async(req, res) =>{
    try{
         let response = await userService.getUserByEmail(req.params);
         res.status(200).send({
             result: response
         })
     }catch(err){
         res.status(500).send({
             result: err
         })
     }
 }

 const getUserByUserId = async(req, res) =>{
    try{
         let response = await userService.getUserByUserId(req.params);
         res.status(200).send({
             result: response
         })
     }catch(err){
         res.status(500).send({
             result: err
         })
     }
 }

 const updateUserType = async(req, res) =>{
    try{
        let response = await userService.updateUserType(req.body);
        if(response.error){
            res.status(401).send({
                result: response.error
            })
        }else{
            res.status(200).send({
                result: response
            })
        }   
    }catch(err){
        res.status(500).send({
            result: err
        })
    }
 }

  const updateUser = async(req, res) =>{
    try{
        let response = await userService.updateUser(req.body);
        if(response.error){
            res.status(401).send({
                result: response.error
            })
        }else{
            res.status(200).send({
                result: response
            })
        }   
    }catch(err){
        res.status(500).send({
            result: err
        })
    }
 }

module.exports = {getAllUsers, getUserByEmail, getUserByUserId, updateUserType, updateUser};