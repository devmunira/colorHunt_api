import express from "express"
import { upadateProfile } from "../api/v1/UserController.js";
import { authenticationMiddleware } from "../middleware/auth/authenticateMiddleware.js";
import AuthToken from "../models/AuthToken.js";
import User from "../models/User.js";

// get router function from express
const router = express.Router()

// User related all routes
router.patch('/profile' , authenticationMiddleware ,  upadateProfile)
router.get('/check' , async (req,res) => {
    const token  = await AuthToken.find();
    res.json(token)
    
  })

// export router for useages
export default router;