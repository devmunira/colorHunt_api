import { loginUser } from "../libs/authenticate.js";
import { createToken } from "../libs/token.js";
import { createUser } from "../libs/user.js"

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
     } catch (error) {
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
   } catch (error) {
        next(error)
   }
}