const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { genError } = require('../utils/helper');

module.exports = (req,res,next) => {
   try {
      const authHeader = req.get('Authorization');
      if(!authHeader) {
         genError(401, 'Not Authenticated!');
      }
      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(token, JWT_SECRET);
      if(!decodedToken) {
         genError(401, 'Not Authenticated!');
      }
      req.userId = decodedToken.userId;
      next();
   } catch (error) {
      error.statusCode = 401;
      error.message = 'Not Authenticated!';
      next(error);
   }
}