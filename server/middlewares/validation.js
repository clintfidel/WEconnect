import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import database from '../models/';

dotenv.config();

const {
  User, Business, Category
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
        errorMessage: 'Provide a valid Email Address'
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
        message: error.msg
      });
    });
    return res.status(409)
      .json(allErrors[0]);
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
  const businessNameError =
  'Please provide a Business name with atleast 5 characters.';
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
        errorMessage:
         'characters should be more than 5 and not greater than 500'
      },
      errorMessage:
       'Provide a detailed info of your business not more than 500 characters'
    },
    location: {
      notEmpty: true,
      errorMessage: 'Your location is required'
    },
    categoryId: {
      notEmpty: true,
      isDecimal: {
        errorMessage: 'category Id has to be numeric value'
      },
      errorMessage: 'category is required'
    },
  });
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        message: error.msg
      });
    });
    return res.status(409)
      .json(allErrors[0]);
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
   * @description - Checks that a user reviews with right details
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const checkReviewsInput = (req, res, next) => {
  const reviewError =
   'Please review with atleast 5 characters and maximum of 100 characters';
  req.checkBody({
    comments: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5, max: 250 }],
        errorMessage: reviewError
      },
      errorMessage: 'Your Business name is required'
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
      .json(allErrors[0]);
  }

  const { id } = req.decoded.currentUser;
  req.reviewInput = {
    comments: req.body.comments,
    userId: id,
    businessId: req.params.businessId
  };

  next();
};

export const checkValidIdParams = (req, res, next) => {
  req.checkParams({
    businessId: {
      isDecimal: {
        errorMessage: 'Business Id has to be numeric value'
      }
    }

  });
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        message: error.msg
      });
    });

    return res.status(409)
      .json(allErrors);
  }
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

export const usernameExist = (req, res, next) => {
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
     * @description - Checks that a business doesnt have a duplicate
     *
     * @param  {Object} req - request
     *
     * @param  {object} res - response
     *
     * @param {Object} next - Call back function
     *
     * @return {object} - status code and error message
     */
export const businessNameExist = (req, res, next) => {
  Business
    .findOne({
      where: {
        name: req.body.name
      }
    })
    .then((business) => {
      if (business) {
        return res.status(409).json({
          message: 'Business name already exist'
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
export const emailExist = (req, res, next) => {
  User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((email) => {
      if (email) {
        return res.status(409).json({
          message: 'email already exist'
        });
      }
      next();
    });
};


/**
 * @description - checks user invalid details
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
  if (!username) { return next(); }
  if (checkDigits.test(username[0]) || checkSpace.test(username) ||
  checkFirstChar.test(username[0]) || typeof username !== 'string') {
    return res.status(406).json({
      status: false,
      message: 'Invalid Username!'
    });
  } else if (username.length < 5) {
    return res.status(406).json({
      status: false,
      message: 'Please provide a Business name with atleast 5 characters.'
    });
  }
  if (!fullname) { return next(); }
  if (checkDigits.test(fullname) || checkMultiSpace.test(fullname) ||
  checkFirstChar.test(fullname[0]) || typeof fullname !== 'string') {
    return res.status(406).json({
      status: false,
      message: 'Invalid fullname!'
    });
  }
  if (!password) { return next(); }
  if (checkDigits.test(password[0]) ||
        checkSpace.test(password) ||
        checkFirstChar.test(password[0]) ||
        typeof password !== 'string') {
    return res.status(406).json({
      status: false,
      message: 'Invalid password!'
    });
  }

  next();
};

/**
     * @description - checks business invalid deails
     *
     * @param  {Object} req - request
     *
     * @param  {object} res - response
     *
     * @param {Object} next - Call back function
     *
     * @return {object} - status code and error message
     */
export const checkBusinessInvalidDetails = (req, res, next) => {
  const { name, details, location } = req.body;
  if (!name) { return next(); }
  if (checkFirstChar.test(name[0]) || typeof name !== 'string') {
    return res.status(406).json({
      status: false,
      message: 'Invalid character in Business Name!'
    });
  } else if (name.length < 5) {
    return res.status(406).json({
      status: false,
      message: 'Please provide a Business name with atleast 5 characters.'
    });
  }
  if (!details) { return next(); }
  if (checkMultiSpace.test(details) ||
      checkFirstChar.test(details[0]) || typeof details !== 'string') {
    return res.status(406).json({
      status: false,
      message: 'Invalid character in Business Details!'
    });
  }
  if (!location) { return next(); }
  if (checkFirstChar.test(location[0]) || typeof location !== 'string') {
    return res.status(406).json({
      status: false,
      message: 'Invalid character in Business Location!'
    });
  }
  next();
};

/**
   * @description - Checks if params input is valid
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const verifyBusinessIdExist = (req, res, next) => {
  if (!req.params.businessId.match(/^[0-9]/) ||
    !req.params.businessId) {
    return res.status(400).json({
      status: false,
      message: 'Unidentified business! pls include a valid businessId'
    });
  }
  return Business
    .findById(req.params.businessId)
    .then((business) => {
      if (!business) {
        return res.status(404).send({
          message: 'No business with that Id found'
        });
      }
      next();
    })
    .catch(error => res.status(404).send(error.errors));
};

/**
     * @description - checks review invalid deails
     *
     * @param  {Object} req - request
     *
     * @param  {object} res - response
     *
     * @param {Object} next - Call back function
     *
     * @return {object} - status code and error message
     */
export const checkReviewInvalidDetails = (req, res, next) => {
  const { comments } = req.body;
  if (checkFirstChar.test(comments[0]) || typeof comments !== 'string') {
    return res.status(406).json({
      status: false,
      message: 'Invalid character in comments! Pls check details'
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
export const validateEditUserId = (req, res, next) => {
  Business
    .findById(req.params.businessId)
    .then(() => {
      if (req.body.userId) {
        return res.status(403).send({
          mesage: 'you cannot edit userId'
        });
      } else if (req.body.userId === 'undefined') {
        next();
      }
      next();
    })
    .catch(() => res.status(500).send('Internal server Error'));
};

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
export const checkInvalidUser = (req, res, next) => {
  const { id } = req.decoded.currentUser;
  Business
    .findById(parseInt(req.params.businessId, 10))
    .then((business) => {
      if (business.userId !== parseInt(id, 10)) {
        return res.status(403).send({
          message:
           'Invalid User! you can only make changes to your own Business'
        });
      }
      next();
    });
};

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
    .catch(error => res.status(500).send(error.errors));
};

/**
     * @description - Ensures user selects a category that is in the database
     *
     * @param  {Object} req - request
     *
     * @param  {object} res - response
     *
     * @param {Object} next - Call back function
     *
     * @return {object} - status code and error message
     */

export const checkCategoryId = (req, res, next) => {
  const { categoryId } = req.body;
  if (!categoryId) next();
  if (!categoryId.match(/^[0-9]/)) {
    return res.status(406).json({
      status: false,
      message: 'categoryId should be a numeric value'
    });
  }
  Category
    .findById(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          status: false,
          message: 'No category with that Id found! pls select from 1-7'
        });
      }
      return next();
    });
};

