import express from "express"
import authRoute from "./AuthRoute.js"

const router = express.Router();

// All Endpints routes all here
router.use('/auth' , authRoute)



// export for use on index file
export default router;


