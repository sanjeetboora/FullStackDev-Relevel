const validateCreate = (req, res, next) =>{
    if(!req.body.name){
        return res.status(400).json({
            message: 'Category name is missing, please try again by adding a category name',
            success: false,
            err: 'name parameter is missing in the request body',
            data: {}
        })
    }
    next();
}

module.exports = {validateCreate}