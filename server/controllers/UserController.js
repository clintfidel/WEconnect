import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import omit from 'lodash/omit';
import database from '../models';

dotenv.config();
const secret = process.env.SECRET_KEY;

const { User } = database;
/**
 * @class BusinessController
 *
 * @classdesc contains all user methods (post,put)
 *
 */
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
    User.create(req.userInput)
      .then((activeUser) => {
        if (activeUser) {
          const currentUser = {
            id: activeUser.id
          };
          const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            currentUser
          }, secret);

          return res.status(201).send({
            message: 'Signed up successfully',
            token
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: 'Internal server Error'
        });
      });
  }

  /**
   * @description - logs a user in with authenticated details
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - Object containing user detail in token form
   *
   * Route: POST: /users/signin
   */
  static login(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400)
        .json({
          message: 'Please provide your username or password to login'
        });
    }
    return User
      .findOne({
        where: { username: req.body.username }
      })
      .then((user) => {
        if (user &&
          bcrypt.compareSync(req.body.password, user.password)) {
          const currentUser = {
            id: user.id
          };
          const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            currentUser
          }, secret);
          return res.status(200)
            .json({
              message: 'Logged In Successfully',
              data: {
                token
              }
            });
        }
        return res.status(403)
          .json({
            message: 'Invalid Credentials.'
          });
      })
      .catch(() =>
        res.status(500).json('Internal server error'));
  }

  /**
   * @description - User edit profile
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - success message and user updated profile
   *
   * Route: POST: /auth/editprofile
   */
  static editProfile(req, res) {
    const { id } = req.decoded.currentUser;
    const {
      username, fullname, email, image
    } = req.body;
    User
      .findOne({
        where: { id }
      })
      .then(editProfile =>
        editProfile
          .update({
            username: username || editProfile.username,
            fullname: fullname || editProfile.fullname,
            email: email || editProfile.email,
            image: image || editProfile.image
          })
          .then((result) => {
            res.status(200).json({
              status: 'success',
              message: 'Profile updated successfully',
              updatedProfile: {
                userId: result.id,
                fullname: result.fullname,
                username: result.username,
                email: result.email,
                image: result.image
              }
            });
          }))
      .catch(() => res.status(500).json({
        message: 'Internal server error'
      }));
  }

  /**
   * @description - get user profile
   *
   * @param  {object} req - request object
   *
   * @param  {object} res - response object
   *
   * @return {Object} - success message and user updated profile
   *
   * Route: GET: api/v1/auth/
   */
  static getUser(req, res) {
    const { id } = req.decoded.currentUser;
    return User
      .findOne({
        where: { id: id }
      })
      .then((user) => res.status(200).json({
        status: "success",
        data: {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          image: user.image
        }
      }))
      .catch(() => res.status(500).json({
        message: 'Internal sever Error'
      }));
  }
}

export default UserController;
