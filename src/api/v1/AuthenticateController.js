import { loginUser } from "../../libs/authenticate.js";
import { createToken } from "../../libs/token.js";
import { createUser, updateToken } from "../../libs/user.js"
import User from "../../models/User.js";
import { generateUniqueCode } from "../../utils/globalUtils.js";
import {sendEmailForEmailVerify} from "../../libs/authenticate.js"
import  bcrypt  from 'bcrypt';


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
        userId : user._id,
      })
   } catch (err) {
      const error = new Error(err)
      error.status = 500
      next(error)
   }
}



/**
* @return check token and send to reset-password page
*/
export const verifyTokenForForgotPass = async (req,res,next) => {
   try {
      const {token, userId} = req.body

      const user = await User.findById(userId).exec()
      if(!user) return res.status(404).json({
         code : 404,
         message : 'User Not Found!'
      })
      
      // token equal plus isNotExpired
      if(token === user.verification_token && user.notExpired){
        return res.status(200).json({
            code : 200,
            mesaage : 'Validation Successfully Completed!',
            isvalid : true,
         })
      }
      //if not verify token user token & expiredAt update 
      user.verification_token = '',
      user.expiredAt = '',
      await user.save();
      return res.status(400).json({
         code : 400,
         message : 'Invalid Token!'
      }) 

   } catch (err) {
      const error = new Error(err)
      error.status = 500
      next(error)
   }
}



/**
* @return password update
*/
export const updatePassword = async (req,res,next) => {
   try {
      const {password , userId} = req.body

      const user = await User.findById(userId).exec()
      if(!user) return res.status(404).json({message : 'User Not Found!'})
      
      user.password = await bcrypt.hash(password , 10)
      await user.save();
      return res.status(200).json({
         code : 200,
         message : 'Password Updated Successfully'
      }) 

   } catch (err) {
      const error = new Error(err)
      error.status = 500
      next(error)
   }
}

