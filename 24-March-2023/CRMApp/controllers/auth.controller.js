const userService = require('../services/user.service');

exports.signup = async (req, res) =>{
    const result = await userService.createUser(req.body);
    res.status(201).send({
        result: result
    })
}