const authService = require("../services/auth.service");
const userService = require("../services/user.service");

const isUserAuthenticated = async (req, res, next) =>{
    const token = req.headers['x-access-token'];
    //if token is not provided
    // no need to verify the token, but just return the error message
    if(!token){
        res.status(401).send({
            message: "jwt token is not provided"
        })
    }

    //if token is provided
    const isVerifiedToken = authService.verfiyJwtToken(token);
    //token is invalid
    if(!isVerifiedToken || isVerifiedToken === "invalid signature"){
        return res.status(401).send({
            message: "jwt token is invalid"
        })
    }
     //token is valid
     try{
        console.log("=====verified tokenemail===========",isVerifiedToken.email);
        const userInfo = await userService.getUserByEmail({email:isVerifiedToken.email});
        console.log("=========userInfo==========",userInfo)
        if(!userInfo){
            return res.status(401).send({
                message: "email is invalid"
            })
        }
        req.user = userInfo;
        next();
    }
     catch(err){
        return res.status(401).send({
            message: "userdata is invalid"
        })
     }
    
}

const isAdmin = (req, res, next) =>{
    if(!req.user){
        return res.status(401).send({
            message: "user is invalid"
        })
    }
    console.log("==================", req.user);
    if(req.user.userType !== "admin"){
        return res.status(401).send({
            message: "user doesn't have required permissions"
        })
    }

    //user is admin
    next();
}

const isAdminOrUserSelf = (req, res, next) =>{
    if(!req.user){
        return res.status(401).send({
            message: "user is invalid"
        })
    }
    console.log("=======req.user===========", req.user);
    console.log("=========req.body.updates========", req.body.updates, req.user._id.equals(req.body.updates._id));
    if(req.user.userType !== "admin" && !req.user._id.equals(req.body.updates._id)){        
        return res.status(401).send({
            message: "user doesn't have required permissions"
        })
    }

    //user is either admin or has self updates
    next();
}

const isAdminOrEngineer = (req, res, next) =>{
    if(!req.user){
        return res.status(401).send({
            message: "user is invalid"
        })
    }
    console.log("==================", req.user);
    if(req.user.userType !== "admin" &&  req.user.userType !== "engineer"){
        return res.status(401).send({
            message: "user doesn't have required permissions"
        })
    }

    //user is admin or engineer
    next();
}

module.exports = {isUserAuthenticated, isAdmin, isAdminOrEngineer, isAdminOrUserSelf};