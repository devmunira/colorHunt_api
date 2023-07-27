import express from "express"
import { upadateProfileForUser } from "../api/v1/UserController.js";
import { authenticationMiddleware } from "../middleware/auth/authenticateMiddleware.js";
import { profileUpdateValidator } from "../request/userRequestValidator.js";
import { requestValidator } from "../middleware/requestValidator.js";

// get router function from express
const router = express.Router()

// User related all routes
router.patch('/profile' , authenticationMiddleware , profileUpdateValidator , requestValidator,  upadateProfileForUser)


// export router for useages
export default router;