import bcrypt from "bcrypt"

// generate Salt for password hasing
export const saltted = async () => {
    const salt = await  bcrypt.genSalt(10)
    return salt;
}