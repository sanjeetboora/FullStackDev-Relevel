
let Client = require('node-rest-client').Client;
let client = new Client();
const notficationServiceUrl = "http://localhost:8080/notificationService/api/v1/notification";

const sendNotification = (subject, content, recepientEmails, requester, ticketId) =>{
    const reqBody = {
        subject, 
        content, 
        recepientEmails, 
        requester, 
        ticketId
    };
    const headers = { "Content-Type": "application/json" };
    const args ={
        data: reqBody,
        headers: headers
    }
    client.post(notficationServiceUrl, args, function (data, response) {
        console.log(data);
        console.log(response);
    });
}

module.exports= sendNotification;