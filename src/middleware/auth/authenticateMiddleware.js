import jwt from 'jsonwebtoken';
import ip from 'ip';
import { createToken } from '../../libs/token.js';
import AuthToken from '../../models/AuthToken.js';
import User from '../../models/User.js';

export const authenticationMiddleware = async (req, res, next) => {
  const headers = req.headers['authorization'];
  const access_token = headers && headers.split(' ')[1];

  // Check if the access_token is missing
  if (!headers) {
    return res.status(401).json({ code: 401, message: 'Please Login First' });
  } else {
    jwt.verify(access_token, process.env.JWT_PASSWORD, async (err, payload) => {
      if (err) {
        // Handle the case when the access_token is invalid or expired
        if (err.name === 'TokenExpiredError') {
          const refresh_token = req.headers['x-refresh-token'];
          try {
            // Verify the refresh_token
            const decodedRefresh = await jwt.verify(refresh_token, process.env.JWT_REFRESH_PASSWORD);
            if (decodedRefresh) {
              // Find the refresh token in the database
              const dbToken = await AuthToken.findOne({ token: refresh_token });

              // Check if the refresh token is valid and matches the issued IP
              if (dbToken && dbToken.issuedIp === ip.address() && dbToken.isActive) {
                // Get the user associated with the refresh token
                const user = await User.findById(dbToken.userId);

                // Generate new access and refresh tokens
                const { refresh_token: newRefreshToken, access_token: newAccessToken } = await createToken(user);

                // Invalidate the old refresh token
                dbToken.isRevoked = true;
                dbToken.revokedIp = ip.address();
                await dbToken.save();

                // Add the new tokens to the customHeaders object in the request
                req.customHeaders = {
                  'xrefreshtoken': newRefreshToken,
                  'authorization': newAccessToken,
                };
                
                req.user = user; // Set the user in the request object
                return next(); // Proceed to the next middleware or route handler
              } else {
                return res.status(401).json({ code: 401, message: 'Invalid Refresh Token! Login Again' });
              }
            }
          } catch (err) {
            return res.status(401).json({ code: 401, message: 'Invalid Refresh Token! Login Again!' });
          }
        } else {
          return res.status(401).json({ code: 401, message: 'Invalid Access Token!' });
        }
      } else {
        // Handle the case when the access_token is valid
        if (payload.issuedIp !== ip.address()) {
          return res.status(401).json({ code: 401, message: 'Invalid Access Token!' });
        } else {
          req.user = payload._doc; // Set the user in the request object
          return next(); // Proceed to the next middleware or route handler
        }
      }
    });
  }
};
