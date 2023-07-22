import User from "../models/User.js"

export const loginUser = async (usernameOremail) => {
   try {
    const user = await User.findOne({
        $or: [{ username: usernameOremail }, { email: usernameOremail }],
    });
    delete user.password
    return user
   } catch (error) {
    
   }
}