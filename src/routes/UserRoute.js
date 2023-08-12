import express from "express"
import { upadatePassword, upadateProfileForUser } from "../api/v1/User/UserController.js";
import { authenticationMiddleware } from "../middleware/auth/authenticateMiddleware.js";
import { changePasswordValidation, profileUpdateValidator } from "../api/v1/User/userRequestValidator.js";
import { requestValidator } from "../middleware/requestValidator.js";

// get router function from express
const router = express.Router()

// User related all routes
router.patch('/profile' , authenticationMiddleware , profileUpdateValidator , requestValidator,  upadateProfileForUser)
router.patch('/password-change' ,authenticationMiddleware , changePasswordValidation , requestValidator, upadatePassword)


// export router for useages
export default router;