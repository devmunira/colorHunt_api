
import jwt from "jsonwebtoken";
import Token from './../models/Token.js';
import {add} from "date-fns"
import ip from "ip"

export const createToken = async (user) => {
   try {
        const access_token = jwt.sign({...user}, process.env.JWT_PASSWORD , {
        expiresIn : 10 * 60
       });
       const refresh_token = jwt.sign({...user}, process.env.JWT_REFRESH_PASSWORD , {
         expiresIn : 3 * 24 * 60 * 60
       });

       const token = new Token({
            token : refresh_token,
            userId : user._id,
            issuedIp: ip.address(),
            expiredAt : add(new Date() , {days : 3}).toISOString()
       })
      await token.save()

      return {
        access_token,
        refresh_token
      }
   } catch (error) {
        next(error)
   }
}