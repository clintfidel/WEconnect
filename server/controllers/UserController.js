import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import dummyDb from '../dummyModels/index';

dotenv.config();

// const secret = process.env.secretKey;
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
    Users.push(addedUser);
    const expiresIn = { exp: '1hr' };
    const token = jwt.sign({ addedUser, expiresIn }, process.env.secretKey);
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
    for (let i = 0; i < Users.length; i += 1) {
      if (username === Users[i].username) {
        if (password !== Users[i].password) {
          return res.status(403).json({
            message: 'password provided does not match username'
          });
        }
        const value = Users[i];
        const expiresIn = { exp: '1hr' };
        const token = jwt.sign({ value, expiresIn }, process.env.secretKey);
        return res.status(200).json({
          message: 'logged in successfully',
          token
        });
      }
      return res.status(401).json({
        message: 'invalid credentials'
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
   * @return {object} - JSON object (message and all users )
   */

  static getUser(req, res) {
    return res.status(200).send({
      status: 'Success',
      Users,
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
   * @return {object} - JSON object (edit user profile )
   */
  static updateUserProfile(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const {
      fullname, username, email
    } = req.body;
    let user;
    for (let i = 0; i < Users.length; i += 1) {
      if (Users[i].id === Number(req.params.id)) {
        Users[i].fullname = fullname;
        Users[i].username = username;
        Users[i].email = email;
        Users[i].password = password;
        user = Users[i];
        const expiresIn = { exp: '1hr' };
        const token = jwt.sign({ user, expiresIn }, process.env.secretKey);
        return res.status(200).json({
          message: 'user profile updated successfully',
          token
        });
      }
      return res.status(403).json({
        message: 'Unauthorized User!'
      });
    }
  }
}

export default UserController;
