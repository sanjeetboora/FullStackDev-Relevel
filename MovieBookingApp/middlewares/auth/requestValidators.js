const {isValidEmail, isValidUserType, isValidUserStatus} = require('../../utils/validationUtils');


const verifySignUpRequestBody = (req, res, next) =>{
    try{
        if(!req.body.name){
            throw new Error("value for field 'name' is not provided");
        }
        if(!req.body.email){
            throw new Error("value for field 'email' is not provided");
        }
        if(!req.body.username){
            throw new Error("value for field 'username' is not provided");
        }
        if(!req.body.password){
            throw new Error("value for field 'password' is not provided");
        }

        const validEmail = isValidEmail(req.body.email);
        if(!validEmail){
            throw new Error("value for field 'email' is not valid");
        }

        req.body.userType && isValidUserType(req.body.userType);
        req.body.userStatus && isValidUserStatus(req.body.userStatus);

        next();
    }
    catch(err){
        return res.status(400).send({
            message: err.message
        })
    }
}

const verifySignInRequestBody = (req, res, next) =>{
    try{
        if(!req.body.email){
            throw new Error("value for field 'email' is not provided");
        }
        if(!req.body.password){
            throw new Error("value for field 'password' is not provided");
        }
        const validEmail = isValidEmail(req.body.email);
        if(!validEmail){
            throw new Error("value for field 'email' is not valid");
        }
        next();
    }
    catch(err){
        return res.status(400).send({
            message: err.message
        })
    }
}

module.exports = {verifySignInRequestBody, verifySignUpRequestBody}