if(process.env.NODE_ENV == "production"){
    require('dotenv').config();
}

module.exports={
    DB_NAME: 'mba_db',
    DB_URL: 'mongodb://127.0.0.1:27017/mba_db'
}
//process.env.MONGODB_URL || 