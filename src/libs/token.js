
import jwt from "jsonwebtoken";
import Token from '../models/AuthToken.js';
import {add} from "date-fns"
import ip from "ip"

export const createToken = async (user) => {
   try {
        const access_token = jwt.sign({...user, issuedIp: ip.address()}, process.env.JWT_PASSWORD , {
        expiresIn : 30 * 60 
       });
       const refresh_token = jwt.sign({...user, issuedIp: ip.address()}, process.env.JWT_REFRESH_PASSWORD , {
         expiresIn : 15 * 24 * 60 * 60 
       });

       const token = new Token({
            token : refresh_token,
            userId : user._id,
            issuedIp: ip.address(),
            expiredAt : add(new Date() , {days : 15}).toISOString()
       });
      await token.save()
      return {
        access_token,
        refresh_token
      }
   } catch (error) {
     console.log(error)
   }
}