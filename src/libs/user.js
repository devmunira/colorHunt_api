import User from "../models/User.js";
import bcrypt  from 'bcrypt';
import { add, addMinutes } from "date-fns";



// Create or Register New User
export const createUser = async (req) => {
    const {username,email,password} = req.body
    const hashPassword = await bcrypt.hash(password , 10)

    try {
        const user = new User({
            username,
            email,
            password : hashPassword,
            status : req.body.status ?? 'active',
            is_admin : req.body.is_admin ?? false,
        });
    
        await user.save();
        delete user._doc.password

        return user;
    } catch (error) {
        let errors;
        errors.message = error.mesaage
        errors.status = 500,
        next(errors)
    }
}

// Update Token for verify Email
export const updateToken = async (email,OTP) => {
    const user = await User.findOne({email})
    user.verification_token = OTP
    user.expiredAt = addMinutes(new Date() , 5)
    user.save();
    return user;
}


// update profile
export const updateProfile = async (req) => {
    const {_id , is_admin} = req.user
    const {username, email, userId} = req.body
   
    let user = {}  
    if(userId){
        user = await User.findById(userId).exec();
    }else{
        user = await User.findById(_id).exec(); 
    }
    if(!user) return res.status(404).json({message : 'User not exits'})

    if(!is_admin && (user.status === 'blocked' || user.status === 'inactive'))

    return res.status(400).json({message : 'User not valid!'}) 
   
    user.username = username ?? user.username
    user.email = email ?? user.email
    user.save();

    return user;
}


// update profile
export const updatePassword = async (req,res) => {
    const {_id , is_admin} = req.user
    const {password, confirm_password, userId} = req.body
   
    let user = {}  
    if(userId){
        user = await User.findById(userId).exec();
    }else{
        user = await User.findById(_id).exec(); 
    }
    if(!user) return res.status(404).json({message : 'User not exits'})

    if(!is_admin && (user.status === 'blocked' || user.status === 'inactive'))

    return res.status(400).json({message : 'User not valid!'}) 
   
    user.password = await bcrypt.hash(password , 10)
    user.save();

    return user;
}
