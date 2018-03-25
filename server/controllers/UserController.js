import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import omit from 'lodash/omit';
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
    User.create(req.userInput)
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
          const currentUser = omit(
            user.dataValues,
            ['password', 'createdAt', 'updatedAt']
          );
          const expireIn = { exp: Math.floor(Date.now() / 1000) + (60 * 60) };
          const token = jwt.sign(
            { expireIn, currentUser },
            secret
          );
          return res.status(200)
            .json({
              message: 'Logged In Successfully',
              data: {
                token,
                userId: user.id
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
   * Route: POST: /users/edit/:userId
   */
  static editProfile(req, res) {
    const { id } = req.decoded.currentUser;
    User
      .findOne({
        where: { id }
      })
      .then((edit) => {
        const currentUser =
        omit(req.userInput, ['password', 'createdAt']);
        edit
          .update(currentUser);
        const token = jwt.sign(
          {
            currentUser,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
          },
          process.env.secretKey
        );
        return res.status(200).json({
          message: 'profile edited successfully!!!',
          newProfile: {
            token,
            userId: edit.id
          }
        });
      })
      .catch(() => res.status(500).json({
        message: 'internal server error'
      }));
  }
}

export default UserController;
