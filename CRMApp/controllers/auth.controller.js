const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
require('dotenv').config();

exports.signup = async (req, res) =>{
    try{
        const result = await userService.createUser(req.body);
        let statusCode;
        let response;
        if(result.error){
            statusCode = 403;
            response = result.error;
        }else{
            statusCode = 201;
            response = result.user;
        }
        res.status(statusCode).send({
            result: response
        })
    }catch(err){
        res.status(500).send({
            result: err
        })
    }
}

exports.signin = async(req, res) =>{
    try{
        const result = await userService.verifyUser(req.body);
        let statusCode;
        let response;
        if(result.error){
            statusCode = 401;
            response = result.error;
        }else{
            statusCode = 201;
            const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET_KEY);
            response = {
                message: "user validated",
                token: token
            };

        }
        res.status(statusCode).send({
            result: response
        })
    }catch(err){
        res.status(500).send({
            result: err
        })
    }
}
