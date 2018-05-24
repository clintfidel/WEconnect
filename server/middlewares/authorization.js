import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const key = process.env.SECRET_KEY;

/**
   * @description - Checks if logged in user has valid AUTH token
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {null} - null
   */
const isLoggedIn = (req, res, next) => {
  let token = req.headers.authorization ||
  req.body.token || req.query.token || req.headers['x-access-token'];
  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(' ');
  }
  if (token) {
    jwt.verify(token, key, (error, decoded) => {
      if (error) {
        res.status(401)
          .send({
            message: 'Failed to Authenticate Token',
            error
          });
      } else {
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    return res.status(401)
      .json({
        message: 'Access denied, Authentication token does not exist'
      });
  }
};

export default isLoggedIn;
