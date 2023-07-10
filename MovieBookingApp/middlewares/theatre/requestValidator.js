const Theatre = require('../../models/theatre.model');
const { userTypes } = require('../../utils/constants');

const validateTheatreReqBody = async(req, res, next) =>{

   try{
        // validate if all the required fields are provided
        if(!req.body.name){
            throw new Error("value for field 'name' is not provided")
        }
        if(!req.body.description){
            throw new Error("value for field 'description' is not provided")
        }
        if(!req.body.rating){
            throw new Error("value for field 'rating' is not provided")
        }
        if(!req.body.street){
            throw new Error("value for field 'street' is not provided")
        }
        if(!req.body.state){
            throw new Error("value for field 'state' is not provided")
        }
        if(!req.body.city){
            throw new Error("value for field 'city' is not provided")
        }
        if(!req.body.pincode){
            throw new Error("value for field 'pincode' is not provided")
        }


        //validate if same theatre at the same location doesn't exist 
        const theatre =  await Theatre.findOne({
            name: req.body.name,
            pincode: req.body.pincode
        })
        if(theatre){
            throw new Error("Failed!! Same theatre already exist at the same location!!");
        }
        next();
   }
   catch(err){
    return res.status(400).send({
            message: err.message
        })
    }
}


const isAdminOrTheatreOwner = async(req, res, next) =>{
    try{
        const currentUser = req.user;
        if(req.user.userType == userTypes.admin){
            next();
        }
        else{
            const theatreId = req.params.id;
            const theatre = await Theatre.findOne({_id: theatreId});
            if(currentUser._id.toString() != theatre.createdBy.toString()){
                throw new Error("Only theatre owner can update or delete the theatre's information");
            }
            next();
        }
    }
    catch(err){
        return res.status(401).send({
                message: err.message
            })
    }
}

module.exports = {validateTheatreReqBody, isAdminOrTheatreOwner}