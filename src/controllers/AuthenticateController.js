import { loginUser } from "../libs/authenticate.js";
import { createToken } from "../libs/token.js";
import { createUser, updateToken } from "../libs/user.js"
import User from "../models/User.js";
import { generateUniqueCode } from "../utils/globalUtils.js";
import {sendEmailForEmailVerify} from "../libs/authenticate.js"

// Login User by valid Username/Email & Password
// after successfull login user will get token and user Data
export const LoginUserByUsernameOrEmail = async (req,res,next) => {
    try {
        const {usernameOremail} = req.body;
        const user = await loginUser(usernameOremail);
        const {access_token, refresh_token} = await createToken(user)
        res.status(200).json({
          mesaage : 'Login Completed Successfully!',
          user,
          access_token,
          refresh_token
        })
     } catch (err) {
         const error = new Error(err)
         error.status = 400
         next(error)
     }
}


/**
 * @return Register User by unique Username & Email
 * after successfull register user will get token and user Data
 */
export const registerUserManually = async (req,res,next) => {
   try {
      const user = await createUser(req);
      const {access_token, refresh_token} = await createToken(user)
      res.status(200).json({
        mesaage : 'Registration Completed Successfully!',
        user,
        access_token,
        refresh_token
      })
   } catch (err) {
      const error = new Error(err)
      error.status = 400
      next(error)
   }
}



/**
* @return check email and send an code to mail
*/
export const verifyEmailForForgotPass = async (req,res,next) => {
   try {
      const OTP = generateUniqueCode();
      const {email} = req.body

      const user = await updateToken(email,OTP)

      const isSend = await sendEmailForEmailVerify(email,user.username,OTP)
      if(!isSend) return res.status(500).json({message : 'Email can not be delivered! we are sorry'})

      res.status(200).json({
        code : 200,
        mesaage : 'Check your inbox for verification token',
      })
   } catch (err) {
      const error = new Error(err)
      error.status = 500
      next(error)
   }
}

