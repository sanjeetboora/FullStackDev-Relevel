const http = require('http');

const requestListener = (req, res) =>{
    /*
    * This function is going to be called 
    * whenever our will receive a request
    * 
    * Details of http request will be present
    * in req parameter
    * 
    * Details of http response will be present
    * in res parameter
    */
    console.log("A new HTTP request received");
    res.writeHead(200, { 'Content-Type': 'text/html'});
   console.log(req.url);
   switch(req.url){
    case "/home":
        res.end("<h1>Welcome to home page!!!<h1>");
        break;
    case "/":
        res.end("<h1>Welcome to our server!!!<h1>");
        break;
    case "/error":
        res.end("<h1>You landed on error page!!!<h1>");
        break;
    default:
        res.end("<h1>Welcome to our page!!!<h1>");
   }
   
   //console.log(res);
   //res.end("<h1>Thanks for visiting!!!<h1>");
}
const server = http.createServer(requestListener);
server.listen(3000);