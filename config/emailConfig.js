import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
let transporter =nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:true,// true for 465 and false for other ports
    auth:{
        user:process.env.EMAIL_USER,// ADMIN GMAIL ID
        pass:process.env.EMAIL_PASS,// ADMIN GMAIL PASSWORD
    },


})
export default transporter;