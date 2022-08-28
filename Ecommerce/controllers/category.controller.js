const getCategories = (req, res) =>{
    return res.json({
        message: 'Successfully fetched the categories',
        success: true,
        code: 200,
        data:{
            name: "electroics",
            description: 'description for electronics'
        }
    });
}

module.exports = {
    getCategories
}