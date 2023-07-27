
import jwt from "jsonwebtoken";
import Token from '../models/AuthToken.js';
import {add, addMinutes} from "date-fns"
import ip from "ip"

export const createToken = async (user) => {
   try {
        const access_token = jwt.sign({...user, issuedIp: ip.address()}, process.env.JWT_PASSWORD , {
        expiresIn : 2 * 60 
       });
       const refresh_token = jwt.sign({...user, issuedIp: ip.address()}, process.env.JWT_REFRESH_PASSWORD , {
         expiresIn : 5 * 60 
       });

       const token = new Token({
            token : refresh_token,
            userId : user._id,
            issuedIp: ip.address(),
            expiredAt : addMinutes(new Date() , 3).toISOString()
       });


      await token.save()
       console.log(access_token, refresh_token)
      return {
        access_token,
        refresh_token
      }
   } catch (error) {
     console.log(error)
   }
}