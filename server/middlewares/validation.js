import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import database from '../models/';

dotenv.config();

const {
  User
} = database;

const checkDigits = /((\d)+)/gi;
const checkSpace = /(\s){1}/;
const checkMultiSpace = /(\s){2}/;
const checkFirstChar = /(\s)+/;
/**
   * @description - Checks that a user signs in with right details
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const checkUserInput = (req, res, next) => {
  const userNameError = 'Please provide a username with atleast 5 characters.';
  req.checkBody({
    username: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5 }],
        errorMessage: userNameError
      },
      errorMessage: 'Your Username is required'
    },
    email: {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Provide a valid a Email Adrress'
      },
      errorMessage: 'Your Email Address is required'
    },
    fullname: {
      notEmpty: true,
      errorMessage: 'Your Fullname is required'
    },
    password: {
      notEmpty: true,
      isLength: {
        options: [{ min: 8 }],
        errorMessage: 'Provide a valid password with minimum of 8 characters'
      },
      errorMessage: 'Your Password is required'
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        error: error.msg
      });
    });
    return res.status(409)
      .json(allErrors);
  }

  const { username, fullname, email } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10); // encrypt password
  req.userInput = {
    username,
    fullname,
    email,
    password
  };
  next();
};

/**
   * @description - Checks that a user inputs right business details
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const checkBusinessInput = (req, res, next) => {
  const businessNameError = 'Please provide a username with atleast 5 characters.';
  req.checkBody({
    name: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5, max: 50 }],
        errorMessage: businessNameError
      },
      errorMessage: 'Your Business name is required'
    },
    details: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5, max: 500 }],
        errorMessage: 'characters should be more than 5 and not greater than 500'
      },
      errorMessage: 'Provide give a detailed info of your business not more than 500 characters'
    },
    location: {
      notEmpty: true,
      errorMessage: 'Your Fullname is required'
    },
    categoryId: {
      notEmpty: true,
      isDecimal: {
        errorMessage: 'category Id has to be numeric value'
      },
      errorMessage: 'category Id is required'
    },
  });
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        error: error.msg
      });
    });
    return res.status(409)
      .json(allErrors);
  }
  const {
    name, details, location, categoryId
  } = req.body;
  const { id } = req.decoded.currentUser;
  req.businessInput = {
    name,
    details,
    location,
    categoryId,
    userId: id
  };
  next();
};


/**
   * @description - Checks that a user can't sign in with same username
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */

export const isSignedUpWithUsername = (req, res, next) => {
  User
    .findOne({
      where: {
        username: req.body.username
      }
    })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: 'username already exist'
        });
      }
      next();
    });
};

  /**
     * @description - Checks that a user can't sign in with same email
     *
     * @param  {Object} req - request
     *
     * @param  {object} res - response
     *
     * @param {Object} next - Call back function
     *
     * @return {object} - status code and error message
     */
export const isSignedUpWithEmail = (req, res, next) => {
  User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: 'email already exist '
        });
      }
      next();
    });
};


/**
     * @description - checks user invalid deails
     *
     * @param  {Object} req - request
     *
     * @param  {object} res - response
     *
     * @param {Object} next - Call back function
     *
     * @return {object} - status code and error message
     */
export const checkUserInvalidDetails = (req, res, next) => {
  const { username, fullname, password } = req.body;
  if (checkDigits.test(username[0]) || checkSpace.test(username) ||
  checkFirstChar.test(username[0])) {
    return res.status(406).json({
      status: false,
      message: 'Invalid Username! Pls check details'
    });
  }
  if (checkDigits.test(fullname) || checkMultiSpace.test(fullname)
  || checkFirstChar.test(fullname[0])) {
    return res.status(406).json({
      status: false,
      message: 'Invalid fullname! Pls check details'
    });
  }
  if (checkSpace.test(password) || checkFirstChar.test(password[0])) {
    return res.status(406).json({
      status: false,
      message: 'Invalid Password! Pls check details'
    });
  }
  next();
};

/**
     * @description - verifies that userId can't be edited
     *
     * @param  {Object} req - request
     *
     * @param  {object} res - response
     *
     * @param {Object} next - Call back function
     *
     * @return {object} - status code and error message
     */
// export const validateEditUserId = (req, res, next) => {
//   const { id } = req.decoded.currentUser;
//   Business
//     .findById(id)
//     .then(() => {
//       if (req.body.userId) {
//         return res.status(403).send({
//           mesage: 'you cannot edit userId'
//         });
//       } else if (req.body.userId === 'undefined') {
//         next();
//       }
//       next();
//     })
//     .catch(() => res.status(500).send('Internal server Error'));
// };

/**
     * @description - Checks that a user is a valid user
     *
     * @param  {Object} req - request
     *
     * @param  {object} res - response
     *
     * @param {Object} next - Call back function
     *
     * @return {object} - status code and error message
     */
// export const checkInvalidUser = (req, res, next) => {
//   const { id } = req.decoded.currentUser;
//   Business
//     .findById(req.params.businessId)
//     .then((business) => {
//       if (business.userId !== parseInt(id, 10)) {
//         return res.status(403).send({
//           message: 'Invalid User! you can only make changes to your own Business'
//         });
//       }
//       next();
//     });
// };

/**
     * @description - Checks if UserId exist in database
     *
     * @param  {Object} req - request
     *
     * @param  {object} res - response
     *
     * @param {Object} next - Call back function
     *
     * @return {object} - status code and error message
     */
export const verifyUserIdExist = (req, res, next) => {
  const { id } = req.decoded.currentUser;
  User
    .findOne({
      where: {
        id
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'No user with that Id found!'
        });
      }
      next();
    })
    .catch(error => res.status(404).send(error.errors));
};