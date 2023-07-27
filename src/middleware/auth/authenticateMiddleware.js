import jwt from 'jsonwebtoken';
import ip from 'ip';
import { createToken } from '../../libs/token.js';
import AuthToken from '../../models/AuthToken.js';
import User from '../../models/User.js';

export const authenticationMiddleware = async (req, res, next) => {
    const headers = req.headers['authorization'];
    const access_token = headers && headers.split(' ')[1];
  
    if (!headers) {
      return res.status(401).json({ code: 401, message: 'Please Login First' });
    } else {
      jwt.verify(access_token, process.env.JWT_PASSWORD, async (err, payload) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            const refresh_token = req.headers['x-refresh-token'];
            try {
              const decodedRefresh = await jwt.verify(refresh_token, process.env.JWT_REFRESH_PASSWORD);

              if(decodedRefresh){
                const dbToken = await AuthToken.findOne({ token: refresh_token });
                if (dbToken && dbToken.issuedIp === ip.address() && dbToken.isActive) {
                  const user =  await User.findById(dbToken.userId);
                  
                  const { refresh_token: newRefreshToken, access_token: newAccessToken } = await createToken(user);

                  dbToken.isRevoked = true
                  dbToken.revokedIp = ip.address();
                  await dbToken.save();

                  req.customHeaders = {
                      'xrefreshtoken' :  newRefreshToken,
                      'authorization' :  newAccessToken,
                  }          
                  req.user = user;
                  return next();
                } else {
                  return res.status(401).json({ code: 401, message: 'Invalid Refresh Token! Login Again' });
                }
              }
            } catch (err) {
              return res.status(401).json({ code: 401, message : 'Invalid Refresh Token! Login Again!' });
            }
          }         
          else {
            return res.status(401).json({ code: 401, message: 'Invalid Access Token!' });
          }
        }    
        else {
          if (payload.issuedIp !== ip.address()) {
            return res.status(401).json({ code: 401, message: 'Invalid Access Token!' });
          } else {
            req.user = payload._doc;
            return next();
          }
        }
      });
    }
  };
 