import User from "../models/User.js";
import bcrypt  from 'bcrypt';

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