const authService = require("../services/auth.service");
const userService = require("../services/user.service");

const isUserAuthenticated = (req, res, next) =>{
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
    if(!isVerifiedToken){
        return res.status(401).send({
            message: "jwt token is invalid"
        })
    }
     //token is valid
     const userInfo = userService.getUserByEmail(isVerifiedToken.email);
    if(!userInfo){
        return res.status(401).send({
            message: "email is invalid"
        })
    }
    req.user = userInfo;
    next();
}

module.exports = {isUserAuthenticated};