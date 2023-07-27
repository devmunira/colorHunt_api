import bcrypt from "bcrypt"
import otpGenerator from "otp-generator"

// generate Salt for password hasing
export const saltted = async () => {
    const salt = await  bcrypt.genSalt(10)
    return salt;
}


// Generate OTP 
export const generateUniqueCode = (length = 6) => {
    const otp = otpGenerator.generate(length, {lowerCaseAlphabets:false, upperCaseAlphabets: false,  specialChars: false }); 
    return otp;
}
  