import { body } from "express-validator"
import User from "../models/User.js"
import { isEmailUnique } from "./authRequestValidator.js"


export const profileUpdateValidator = [
    body('username')
    .trim()
    .isAlphanumeric()
    .withMessage('Username must be a valid text format')
    .bail()
    .isLength({min: 5, max: 10})
    .withMessage('Username must be between 5-10 charecters')
    .custom(async (val , {req}) => {
        const id = req.user._id ?? req.body.userId

        const user = await User.findOne({username: val})
        if (user && user.id !== id) 
            throw new Error('Username already exits')
        return true
    }),

    body('email')
    .isEmail()
    .withMessage('Email must be an valid email')
    .custom(async (val , {req}) => {
        const id = req.user._id ?? req.body.userId

        const user = await User.findOne({email: val})
        if (user && user.id !== id) 
            throw new Error('Email already exits')
        return true
    }),

]