const authService = require('../services/auth.service');
const authHelperService = require('../services/auth-helper.service');
const roleService = require('../services/role.service');

const isAuthenticated = async(req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token){ //when user is not sending any token in the request;
        return res.json({
            status: 401,
            message: "JWT token is missing",
            data: {},
            err: 'Invalid or missing argument in request header'
        });
    }

    //user is sending a token in the request
    const response = authService.verifyToken(token);
    if(!response){
        return res.json({
            status: 401,
            message: "Invalid JWT token",
            data: {},
            err: 'Invalid auth details'
        });
    }

    const user = await authHelperService.getUserByEmail(response.email);
    if(!user){
        return res.json({
            status: 401,
            message: "JWT token send for an invalid user",
            data: {},
            err: 'Invalid credentials'
        });
    }

    req.user = user;

    next();
}

const checkAdmin = async(req, res, next) =>{
    const user =  req.user;
    const adminRole = await roleService.getRoleByName('admin');
    const isAdmin = await user.hasRole(adminRole);
    if(!isAdmin){
        return res.json({
            status: 401,
            message: "User is not admin",
            data: {},
            err: 'Not authorized'
        });
    }

    next();
}

const checkAdminOrSeller = async(req, res, next) =>{
    const user =  req.user;
    const adminRole = await roleService.getRoleByName('admin');
    const sellerRole = await roleService.getRoleByName('seller');
    const isAdmin = await user.hasRole(adminRole);
    const isSeller = await user.hasRole(sellerRole);
    if(!isAdmin && !isSeller){
        return res.json({
            status: 401,
            message: "User is not authorized",
            data: {},
            err: 'Not authorized'
        });
    }

    next();
}

module.exports = {isAuthenticated, checkAdmin, checkAdminOrSeller}