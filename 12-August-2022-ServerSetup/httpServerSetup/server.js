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
   console.log(res);
   res.writeHead(200, { 'Content-Type': 'text/html'});
   res.end("<h1>Thanks for visiting!!!<h1>");
}
const server = http.createServer(requestListener);
server.listen(3000);