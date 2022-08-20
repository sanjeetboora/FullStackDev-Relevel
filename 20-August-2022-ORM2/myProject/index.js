const express = require('express');
const app = express();
const port = 3000;

const Student = require('./models/index').Student;


app.listen(port, async() => {
    console.log(`Express app listening on port ${port}`)
  
    let student1 = await Student.create({name: "Xyz", age: 10});
    console.log(student1);
    let data = await Student.findAll();
    console.log(data);
});

