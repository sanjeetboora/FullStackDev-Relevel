const authService = require('../services/auth.service');

const signup = async(req, res) =>{
    const response = await authService.signup(req.body);
    return res.json({
        message: 'Successfully signed up',
        success: true,
        data: response,
        code: 200,
    })
}

module.exports = {signup}