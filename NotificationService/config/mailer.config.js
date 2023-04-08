require('dotenv').config();

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
// const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
// const EMAIL_HOST = 'smtp.gmail.com';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

module.exports = {EMAIL_ADDRESS, SENDGRID_API_KEY};