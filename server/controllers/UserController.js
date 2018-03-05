import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import dummyDb from '../dummyModels/index';

dotenv.load();

const secret = process.env.secretKey;
const { UserModel } = dummyDb;

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
      id: UserModel.length + 1,
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password
    };
    const expiresIn = { exp: '1hr' };
    const token = jwt.sign({ addedUser, expiresIn }, secret);
    Object.assign(req.body, addedUser);
    UserModel.push(req.body);
    console.log(UserModel);
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
    const loggedInUser = {
      username: req.body.username,
    };
    for (let i = 0; i < UserModel.length; i += 1) {
      if (UserModel[i] && UserModel[i].username === req.body.username) {
        if (req.body.password === UserModel[i].password) {
          const expiresIn = { exp: '1hr' };
          const token = jwt.sign({ loggedInUser, expiresIn }, secret);
          return res.status(200).json({
            message: 'Loggedin successfully',
            token
          });
        }
      }
      return res.status(401).json({
        message: 'Invalid details'
      });
    }
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
   * @return {object} - status code and  message
   */

  static getUser(req, res) {
    const user = [];
    for (let i = 0; i < UserModel.length; i += 1) {
      if (UserModel.length === 0) {
        return res.status(404).json({
          message: 'no user found'
        });
      }
      user.push(UserModel[i]);
      console.log(user);
      return res.status(200).json({
        message: 'users found',
        user
      });
    }
  }
}


export default UserController;
