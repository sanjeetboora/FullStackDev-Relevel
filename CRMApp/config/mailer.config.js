require('dotenv').config();

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_HOST = 'smtp.gmail.com';

module.exports = {EMAIL_ADDRESS, EMAIL_PASSWORD, EMAIL_HOST};