import User from "../../models/User.js"

// update profile info
export const upadateProfile = async (req,res,next) => {
    try {
        const {_id , is_admin} = req.user
        const {username, email, userId} = req.body

        let user = {}
        
        if(!userId){
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

        delete user.password;
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