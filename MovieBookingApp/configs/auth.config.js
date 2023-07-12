if(process.env.NODE_ENV == "production"){
    require('dotenv').config();
}
module.exports = {
    secretKey : process.env.SECRET_KEY||"movie-booking-app-secret-key"
};