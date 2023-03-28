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

module.exports = {getAllUsers};