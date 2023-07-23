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
    verification_token : {
        type: Number,
        require: false,
    },
    expiredAt : {
        type: Date,
        require: false,
    },
    status : {
        type: String,
        default: 'active',
        enum: ['active', 'inactive', 'blocked'],
    },

},{timestamps : true});


userSchema.virtual('notExpired').get(function(){
    return this.verification_token && !isAfter(new Date() , new Date(this.expiredAt))
})

userSchema.set('toJSON' , {
    virtuals : true,
    versionKey: false,
});


const User = model('User' , userSchema)
export default User;
