const Theatre = require('../models/theatre.model');

const getAllTheatres = async(filters) => {
    const theatres = await Theatre.find(filters);
    return theatres;
}

const createTheatre = async(data) => {
    const theatreObj = {
        name: data.name,
        description: data.description,
        rating: data.rating, 
        street: data.street,
        state: data.state,
        city: data.city,
        pincode: data.pincode,
    }
    const theatre = await Theatre.create(theatreObj);
    return theatre;
}

const getTheatreById = async(theatreId) =>{
    const theatre = await Theatre.findOne({_id : theatreId});
    return theatre;
}

const updateTheatre = async(theatreId, data) =>{
    const theatre = await Theatre.findOne({_id : theatreId});
    theatre.name = data.name || theatre.name;
    theatre.description = data.description || theatre.description;
    theatre.rating = data.rating || theatre.rating;
    theatre.street = data.street || theatre.street;
    theatre.state = data.state || theatre.state;
    theatre.city = data.city || theatre.city;
    theatre.pincode = data.pincode || theatre.pincode;

    const updatedTheatre = await Theatre.findOneAndUpdate({_id : theatreId}, theatre, {new: true});
    return updatedTheatre;
}

const deleteTheatre = async(theatreId) =>{
    const theatre = await Theatre.findOneAndDelete({_id : theatreId});
    return theatre;
}

module.exports = {getAllTheatres, createTheatre, getTheatreById, updateTheatre, deleteTheatre}