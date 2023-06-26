const {isValidEmail, isValidUserStatus, isValidUserType} = require('../../utils/validationUtils');

const verifyUpdatePasswordRequest = (req, res, next) =>{
    try{
        if(!req.body.oldPassword){
            throw new Error("value for field 'oldPassword' is not provided");
        } 
        if(!req.body.newPassword){
            throw new Error("value for field 'newPassword' is not provided");
        }
        if(req.body.oldPassword == req.body.newPassword){
            throw new Error("value for fields 'oldPassword' and 'newPassword' cannot be equal");
        } 
        next();
    }
    catch(err){
        return res.status(400).send({
            message: err.message
        })
    }
}

const verifyUpdateUserInformationRequest = (req, res, next) =>{
    try{

        if(req.body.email){
            const validEmail = isValidEmail(req.body.email);
            if(!validEmail){
                throw new Error("value for field 'email' is not valid");
            }
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

module.exports = {verifyUpdatePasswordRequest, verifyUpdateUserInformationRequest}