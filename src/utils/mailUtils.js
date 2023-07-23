import nodemailer from "nodemailer"

// generate gmail smtp for mail sender
export const mailTransporter = () => {
    const transporter = nodemailer.createTransport({
        host: 'sdcbangladesh.org', 
        port: 465, 
        secure: true, 
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    return transporter;
}