import express from "express"
import { LoginUserByUsernameOrEmail, registerUserManually, verifyEmailForForgotPass } from "../controllers/AuthenticateController.js"
import { loginRequestValidator, registerRequestValidator, verifyEmailRequest } from "../request/authRequestValidator.js"
import { requestValidator } from "../middleware/requestValidator.js"

// get router function from express
const router = express.Router()

// Authntication related all routes
router.post('/signup' , registerRequestValidator , requestValidator , registerUserManually)
router.post('/signin' , loginRequestValidator , requestValidator, LoginUserByUsernameOrEmail)
router.post('/forgot-password/email-verify' , verifyEmailRequest, requestValidator , verifyEmailForForgotPass)


// export router for useages
export default router;