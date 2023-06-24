const mongoose = require('mongoose');

/** 
 * Define the schema of the movie resource to be stored in the DB
*/

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    casts:{
        type: [String],
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    genre:{
        type: [String],
        required: true
    },
    posterUrl:{
        type: [String],
    },
    trailerUrl:{
        type: [String],
    },
    language:{
        type: String,
        required: true
    },
    releaseDate:{
        type: Date,
        required: true
    },
    releaseStatus:{
        type: String,
        required: true
    },
    director:{
        type: [String],
        required: true
    },
    theatres: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Theatre"
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
},
{

})


module.exports = mongoose.model("Movie", movieSchema);