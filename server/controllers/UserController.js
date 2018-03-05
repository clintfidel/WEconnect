import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import dummyDb from '../dummyModels/index';

dotenv.load();

const secret = process.env.secretKey;
const { Users } = dummyDb;

/**
 *
 *@class UserController
 *@classdesc creates a UserController Class
 */

class UserController {
  /**
   * Register a user on the platform
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the user created or error message
   * @memberof UserController
   */

  static addUser(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const addedUser = {
      id: Users.length + 1,
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password
    };
    const expiresIn = { exp: '1hr' };
    const token = jwt.sign({ addedUser, expiresIn }, secret);
    Users.push(addedUser);
    return res.status(201).json({
      message: 'signed up successfully',
      token
    });
  }

  /**
   * @description - Logs a user in
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @memberOf UserController
   *
   * @return {object} - status code and  message
   */

  static login(req, res) {
    const { username, password } = req.body;
    Users.forEach((user) => {
      if (user.username === username) {
        if (user.password !== password) {
          return res.status(200).json({
            message: 'password provided does not match username'
          });
        }
        const expiresIn = { exp: '1hr' };
        const token = jwt.sign({ username, expiresIn }, secret);
        return res.status(200).json({
          message: 'logged in successfully',
          token
        });
      }

      return res.status(403).json({
        message: 'you are not authorized'
      });
    });
  }

  /**
   * @static
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @memberOf UserController
   *
   * @return {object} - JSON object (message and all users )
   */

  static getUser(req, res) {
    if (!Users) {
      return res.status(404).send({
        message: 'No user Found!'
      });
    }
    return res.status(200).send({
      status: 'Success',
      Users,
    });
  }
}

export default UserController;
