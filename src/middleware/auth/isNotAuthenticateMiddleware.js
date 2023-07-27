import jwt from 'jsonwebtoken';

export const isNotAuthenticateMiddleware = async (req, res, next) => {
  const headers = req.headers['authorization'];
  const refresh_token = req.headers['x-refresh-token'];

  if (headers && refresh_token) {
    try {
      // Verify the refresh_token and access_token separately
      const decodedRefresh = jwt.verify(refresh_token, process.env.JWT_REFRESH_PASSWORD);
      const access_token = headers && headers.split(' ')[1];
      const decodedAccess = jwt.verify(access_token, process.env.JWT_PASSWORD);

      console.log(decodedAccess , decodedRefresh)

      // If both tokens are valid, the user is already logged in
      if (decodedAccess && decodedRefresh) {
        console.log('Hello')
        return res.status(400).json({
          code: 400,
          message: 'You have already logged in and cannot access this route.',
        });
      }

      if(!decodedRefresh){
        next();
      }
    } catch (err) {
        return res.status(500).json({
            code: 500,
            message: err,
        });
    }
  }
  // If there are no valid tokens or an error occurred during verification, continue to the next middleware
  next();
};
