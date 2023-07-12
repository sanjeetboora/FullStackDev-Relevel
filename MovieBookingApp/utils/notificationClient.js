var Client = require('node-rest-client').Client;
var client = new Client();
const notficationServiceUrl = process.env.NOTIFICATION_SERVICE_URL + '/notificationService/api/v1/notification' || "http://localhost:8081/notificationService/api/v1/notification";

const sendEmail = (subject, content, recepientEmails, requester, ticketId) => {
	const reqBody = {
		subject: subject,
		content: content,
		recepientEmails: recepientEmails,
		requester: requester,
		ticketId: ticketId,
	}
	// set content-type header and data as json in args parameter
	var args = {
		data: reqBody,
		headers: { "Content-Type": "application/json" }
	};

	client.post(notficationServiceUrl, args, function (data, response) {
		// parsed response body as js object
		console.log(data);
		// raw response
		console.log(response);
	});
}

module.exports = {sendEmail};
