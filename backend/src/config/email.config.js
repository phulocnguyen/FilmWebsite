
const nodemailer = require('nodemailer');
require('dotenv').config();

async function EmailTransporter() {
    try {

        console.log(process.env.EMAIL,process.env.PASSWORD);
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
            
    });
        return transporter;
    } catch (error) {
        console.error('Error to create transporter:', error);
        return null;
    }

}
module.exports =  {EmailTransporter};