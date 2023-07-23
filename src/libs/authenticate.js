import User from "../models/User.js"
import { mailTransporter } from "../utils/mailUtils.js";

// Login User with username Or password
export const loginUser = async (usernameOremail) => {
   try {
    const user = await User.findOne({
        $or: [{ username: usernameOremail }, { email: usernameOremail }],
    });
    delete user.password
    return user
   } catch (error) {
    
   }
}

// Send Email with OTP for verify email
export const sendEmailForEmailVerify = async (email,username,code) => {
    try {
        const transporter = mailTransporter();
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Forgot Password OTP',
            html: `<strong>Dear ${username},</strong><br><p>You have requested to reset your password for your account with Color Hunt.  
            Please use the following One-Time Password (OTP) to reset your password: <h1><strong>${code}</strong></h1> </p><p>This OTP is valid for the next 5 minutes. If you didn't request this password reset, please ignore this email.</p>
            <p>Thank you,</p>
            <p>The Color Hunt Team</p>`
        };
        await transporter.sendMail(mailOptions)
        return true;
    } catch (error) {
        return false;
    }
}