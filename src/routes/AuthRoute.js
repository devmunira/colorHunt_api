import express from "express"
import { LoginUserByUsernameOrEmail, registerUserManually, updatePassword, verifyEmailForForgotPass, verifyTokenForForgotPass } from "../api/v1/AuthenticateController.js"
import { loginRequestValidator, passwordResetValidation, registerRequestValidator, verifyEmailRequest } from "../request/authRequestValidator.js"
import { requestValidator } from "../middleware/requestValidator.js"

// get router function from express
const router = express.Router()

// Authntication related all routes
router.post('/signup' , registerRequestValidator , requestValidator , registerUserManually)
router.post('/signin' , loginRequestValidator , requestValidator, LoginUserByUsernameOrEmail)
router.post('/forgot-password/email-verify' , verifyEmailRequest, requestValidator , verifyEmailForForgotPass)
router.post('/forgot-password/token-verify', verifyTokenForForgotPass)
router.post('/forgot-password/password-reset' , passwordResetValidation , requestValidator, updatePassword)


// export router for useages
export default router;