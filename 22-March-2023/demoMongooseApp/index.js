const mongoose = require('mongoose');
const Student = require('./models/students.model');

/* connect to mongo db */
const mondoDbUri = 'mongodb://127.0.0.1:27017/dempMongooseAppDb';
mongoose.connect(mondoDbUri).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ 
        console.log("connected to mongo db successfully");
    },
    err => { 
        /** handle initial connection error */
        console.log("Error occurred: ", err);
    }
);

/* async function to execute the db operations */

async function dbOperations(){
    const myStudent = await Student.create({
        name: "Abc", 
        age: 29, 
        email: "shweta@xyz.com", 
        subjects: ["English"],
        enrollmentId: new mongoose.Types.ObjectId(), 
        address:{
            street: "1B",
            city: "Pune",
            country: "India"
        }
    });
    console.log("myStudent: ", myStudent);


    // const myStudent1 = await Student.findOne({email:"shweta@xyz.com"});
    // console.log(myStudent1);

    // const myStudents= await Student.find({email:"shweta@xyz.com"});
    // console.log(myStudents);

//     const myStudents2 = await Student.
//     find({ email: "shweta@xyz.com" }).
//     where('age').equals('19').
//     where('age').gt(18).lt(23).
//     limit(2).
//     sort('-age');

//     console.log(myStudents2);
 }

dbOperations();











