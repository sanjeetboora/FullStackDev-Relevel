const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');
const authHelperService = require('../services/auth-helper.service');
require('dotenv').config();

const signup = async(req, res) =>{
    const response = await authService.signup(req.body);
    return res.json({
        message: 'Successfully signed up',
        success: true,
        data: response,
        code: 200,
    })
}


const signin = async(req, res) =>{
    const userData = await authHelperService.getUserByEmail(req.body.email);
    if(!userData){ //user is not present in db for given email
        return res.json({
            message: 'Email id is incorrect, please try again',
            success: true,
            data: null,
            code: 400,
        })
    }else{//user is present in db for given email
        // passwordGivenByUser is req.body.password;
        //actualHashedPasswordStoredInDb is userData.password;
        const passwordVerified = authService.verifyPassword(req.body.password, userData.password);
        if(passwordVerified){ //password is correct
            var token = jwt.sign({ email: userData.email, password: userData.password, username: userData.username}, process.env.JWT_SECRET_KEY, {expiresIn: '2h'});
            return res.json({
                message: 'Signed in successfully',
                success: true,
                code: 200,
                token: token
            });
        }else{//password is incorrect
            return res.json({
                message: 'Password is incorrect, please try again',
                success: true,
                data: null,
                code: 400,
            });
        }
    }
}

module.exports = {signup, signin}