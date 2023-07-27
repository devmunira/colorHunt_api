import {Schema , model} from "mongoose"
import {isAfter} from "date-fns"


const authTokenSchema = new Schema({
    token : {
        require : true,
        type: String,
        unique: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        require : true,
        ref: 'User'
    },
    expiredAt : {
        type: Date,
        require : true
    },
    revokedAt : {
        type: Date,
    },
    revokedIp : {
        type: String,
    },
    isRevoked:{
        type: Boolean,
        default: false
    },
    issuedIp:{
        type: String,
        require: true
    }

},{timestamps : true})


// Check Token is Exipred or Not
authTokenSchema.virtual('isExpired').get(function(){
    return isAfter(new Date() , new Date(this.expiredAt))
})

// check token isActive or Not based on not expired and not revoked
authTokenSchema.virtual('isActive').get(function(){
    return !this.isRevoked && !this.isExpired
})

// Set virtuals
authTokenSchema.set('toJSON', {
    virtuals: true,
    versionKey : false
})



const AuthToken = model('AuthToken' , authTokenSchema)
export default AuthToken;
