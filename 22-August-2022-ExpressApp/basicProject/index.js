const express = require('express');
const app = express();
const port = 3000;
const {Course} = require('./models/index');
let coursesData = [
    {title:"full stack dev course", description:"This is FSD course", price:20},
    {title:"backend dev course", description:"This is backend course", price:10},
    {title:"frontend dev course", description:"This is frontend course", price:7},
    {title:"ruby on rails dev course", description:"This is ruby on rails course", price:10},
    {title:"django dev course", description:"This is django course", price:15},
]

app.get('/', (req, res)=>{
    res.send("Welcome to my website");
});

app.get('/courses', (req, res) => {
    (async ()=>{
        let listOfCourses = await Course.findAll();
        res.send(listOfCourses);
    })();
});

app.listen(port, async() => {
    console.log(`Express app listening on port ${port}`)
    try{
        await Course.bulkCreate(coursesData);
    }catch(err){
        console.log("We are getting error: ", err);
    }
});

