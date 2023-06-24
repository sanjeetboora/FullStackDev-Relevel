const authService = require('../services/auth.service');


const signup = async(req, res) =>{
    try{
        const response = await authService.signup(req.body);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(201).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: response.error
        })
    } 
}

const signin = async(req, res) =>{
    try{
        //will implement this in a while
        const response = await authService.signin(req.body);
        if(response.error){
            return res.status(401).send({
                error: response.error
            })
        }
        return res.status(201).send({
            result: response
        })
    }catch(err){
        return res.status(500).send({
            error: response.error
        })
    } 
}

module.exports = {signup, signin};
