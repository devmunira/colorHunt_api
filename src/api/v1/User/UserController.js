import { updatePassword, updateProfile } from "../../../libs/user.js"
import User from "../../../models/User.js"

// update profile info
export const upadateProfileForUser = async (req,res,next) => { 
    try {
        const user = await updateProfile(req)
        if(req.customHeaders){
            res.setHeader('authorization' , req.customHeaders.authorization)
            res.setHeader('x-refresh-token' , req.customHeaders.xrefreshtoken)
        }
        return res.status(200).json({
            code : 200,
            message : 'User Updated Successfully!',
            user,
        }) 
    } catch (err) {
        let error = new Error(err)
        error.status = 500
        next(error)
    }
}

// update password
export const upadatePassword = async (req,res,next) => { 
    try {
        const user = await updatePassword(req,res)
        return res.status(200).json({
            code : 200,
            message : 'User Password Updated Successfully!',
            user,
        }) 
    } catch (err) {
        let error = new Error(err)
        error.status = 500
        next(error)
    }
}