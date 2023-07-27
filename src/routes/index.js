import express from "express"
import authRoute from "./AuthRoute.js"
import userRoute from "./UserRoute.js"

const router = express.Router();

// All Endpints routes all here
router.use('/auth' , authRoute)
router.use('/' , userRoute)



// export for use on index file
export default router;


