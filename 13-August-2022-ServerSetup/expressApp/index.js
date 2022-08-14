const express = require('express');
const app = express();
let path = require('path');
let fs = require('fs');
//console.log(fs);
//console.log(app);


const port = 3000
let login =(req, res, next) =>{
    console.log("hey login first!");
    if(req.url == '/'){
        res.send('Login first in hello world!');
    }
    else{
        next();
    }
}

let authorized =(req, res, next) =>{
    console.log("hey are you autherized!");
    next();
}

app.get('/', login, authorized,(req, res) => {
  res.send('Hello World!');
});

app.get('/home', login,(req, res) => {

    let filePath = path.join(__dirname +'/myFile.txt');
    fs.stat(filePath,function(err, fileInfo){
        console.log("fileInfo", fileInfo)
        if(err){
            res.send('Welcome to home page!');
        }
        else if(fileInfo.isFile()){
            res.sendFile(filePath);
        }
    })
    //res.send('Welcome to home page!');
    
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
});

//task
//I want to call a function login before sending response of the incoming request on '/' route
//how can I do that