const{SENDGRID_API_KEY} = require('../config/mailer.config');
const sendgridMail = require('@sendgrid/mail')
sendgridMail.setApiKey(SENDGRID_API_KEY)

module.exports = sendgridMail
