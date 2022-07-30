const http = require('http'); //core module of nodejs
const fact = require('./index2'); //local module
const car = require('./anotherFolder/car')//local module


let factorialOfN = fact(10);
console.log(factorialOfN);
console.log(car);


// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});


// Now that server is running
server.listen(5000);

//run in browser
//http://localhost:5000/