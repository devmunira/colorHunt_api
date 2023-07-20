import {Schema , model} from "mongoose"
import {isAfter} from "date-fns"


const userSchema = new Schema({
    username : {
        require : true,
        type: String,
        unique: true,
    },
    email:{
        type: String,
        require : true,
        unique: true
    },
    password : {
        type: String,
        require : true
    },
    is_admin : {
        type: Boolean,
        default: false
    },
    status : {
        type: String,
        default: 'active',
        enum: ['active', 'inactive', 'blocked'],
    },

},{timestamps : true})


const User = model('User' , userSchema)
export default User;
