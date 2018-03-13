import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import omit from 'lodash/omit';
// import checkSpace from '../helper/checkSpace';
import database from '../models';

dotenv.config();
const secret = process.env.secretKey;

const { User } = database;

class UserController {
  /**
   * @description - Adds a new user to the database
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - Object containing user detail in form of token
   *
   * Route: POST: /users/signup
   */
  static signUp(req, res) {
    return User.create(req.userInput)
      .then((activeUser) => {
        if (activeUser) {
          const currentUser = omit(
            activeUser.dataValues,
            ['password']
          );
          const expiresIn = { exp: Math.floor(Date.now() / 1000) + (60 * 60) };
          const token = jwt.sign(
            { currentUser, expiresIn },
            secret
          );

          return res.status(201).send({
            message: 'Signed up successfully',
            token
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          status: false,
          message: 'Internal server Error'
        });
      });
  }
}

export default UserController;
