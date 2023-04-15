const mongoose = require('mongoose');
const { MongoMemoryServer } =require('mongodb-memory-server');

let mongod;

module.exports.connect = async() =>{
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    //connect mongoose with MongoMemoryServer
    mongoose.connect(uri);
}

//disconnect or close the database
module.exports.closeDatabase = async() =>{
    //drop the db
    await mongoose.connection.dropDatabase();

    //close the connection
    await mongoose.connection.close();

    //stop the server
    await mongod.stop();
}

//clear the db / remove all the data
module.exports.clearDatabase = () =>{
    //to get all the tables/collections
    const collections = mongoose.connection.collections;
    //for each table/collection
    for(const key in collections){
        //get the current table/collection
        const collection = collections[key];
        //delete all the rows/documents of current table/collection
        //collection.deleteMany();
    } 
}





