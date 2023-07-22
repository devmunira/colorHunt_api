import express from "express"
import { LoginUserByUsernameOrEmail, registerUserManually } from "../controllers/AuthenticateController.js"
import { loginRequestValidator, registerRequestValidator } from "../request/authRequestValidator.js"
import { requestValidator } from "../middleware/requestValidator.js"

// get router function from express
const router = express.Router()

// Authntication related all routes
router.post('/signup' , registerRequestValidator , requestValidator , registerUserManually)
router.post('/signin' , loginRequestValidator , requestValidator, LoginUserByUsernameOrEmail)


// export router for useages
export default router;