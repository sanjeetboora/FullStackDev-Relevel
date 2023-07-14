const mongoose  = require("mongoose");

/** 
 * Define the schema of the theatre resource to be stored in the DB
*/

const theatreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    }, 
    street:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    pincode:{
        type: String,
        required: true
    },
    movies: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Movie"
    },
    showrooms:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Showroom"
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now(),
        immutable: true
    },
    updatedAt:{
        type: Date,
        required: true,
        default: Date.now(),
    },
})

module.exports = mongoose.model("Theatre", theatreSchema);
