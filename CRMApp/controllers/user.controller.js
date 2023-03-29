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



module.exports = {getAllUsers, getUserByEmail, getUserByUserId};