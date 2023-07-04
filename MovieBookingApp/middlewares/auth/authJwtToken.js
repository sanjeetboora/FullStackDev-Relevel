const jwt = require('jsonwebtoken');
const { secretKey } = require('../../configs/auth.config');
const User= require('../../models/user.model');
const { userTypes, userStatus } = require('../../utils/constants');

const verifyUserWithToken = (req, res, next) =>{
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(401).send({
            message: "No auth token provided"
        })
    }

    jwt.verify(token, secretKey, async(err, decoded) =>{
        if(err){
            return res.status(401).send({
                result: "Unauthorized!",
                message: err.message
            })
        }
        const user = await User.findOne({_id: decoded.userId});
        if(!user){
            return res.status(401).send({
                message: "Invalid user"
            })
        }
        req.user = user;
        next();
    });    
}

const isUserStatusApproved = async(req, res, next) =>{
    if(req.user.userStatus != userStatus.approved){
        return res.status(403).send({
            message: `current user with the user status ${req.user.userStatus}, is unauthorized!`
        })
    }
    next();
}

const isAdmin = async (req, res, next) =>{
    
    if(req.user.userType != userTypes.admin){
        return res.status(403).send({
            message: "Admin role is required"
        })
    }
    next();
}

const isAdminOrClient = async (req, res, next) =>{
    
    if(req.user.userType != userTypes.admin && req.user.userType != userTypes.client){
        return res.status(403).send({
            message: "Admin or Client role is required"
        })
    }
    next();
}

module.exports = {verifyUserWithToken, isAdmin, isUserStatusApproved, isAdminOrClient}

