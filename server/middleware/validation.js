
import dummyDb from '../dummyModels/index';


const { Users, Business } = dummyDb;
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
    businessName: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5, max: 50 }],
        errorMessage: businessNameError
      },
      errorMessage: 'Your Business name is required'
    },
    businessDetails: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5, max: 500 }],
        errorMessage: 'characters should be more than 5 and not greater than 500'
      },
      errorMessage: 'Provide give a detailed info of your business not more than 500 characters'
    },
    businessLocation: {
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
    userId: {
      notEmpty: true,
      isDecimal: {
        errorMessage: 'user Id has to be numeric value'
      },
      errorMessage: 'user Id is required'
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
  const businessNameError = 'Please review with atleast 5 characters and maximum of 100 characters';
  req.checkBody({
    content: {
      notEmpty: true,
      isLength: {
        options: [{ min: 5, max: 100 }],
        errorMessage: businessNameError
      },
      errorMessage: 'Your Business name is required'
    },

    userId: {
      notEmpty: true,
      isDecimal: {
        errorMessage: 'user Id has to be numeric value'
      },
      errorMessage: 'user Id is required'
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

  next();
};

/**
   * @description - searches business by categoryId or location
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const seaarchBusiness = (req, res, next) => {
  const searchedLocation = [];
  const searchedCategory = [];
  const { category, location } = req.query;
  if (category) {
    Business.filter((found) => {
      if (found.categoryId === parseInt(category, 10)) {
        searchedCategory.push(found);
        return res.status(200).send(searchedCategory);
      }
      return res.status(404).json({
        message: 'No match found'
      });
    });
  }
  if (location) {
    Business.filter((found) => {
      if (location.toLowerCase() === found.businessLocation.toLowerCase()) {
        searchedLocation.push(found);
        return res.status(200).send(searchedLocation);
      }
      return res.status(404).json({
        message: 'No match found'
      });
    });
  } else if (!category || !location) {
    next();
  }
};

/**
   * @description - Checks that a user name or email is not duplicated
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {object} - status code and error message
   */
export const userNameOrEmailExist = (req, res, next) => {
  const { username, email } = req.body;
  Users.forEach((user) => {
    if (user && user.username === username) {
      return res.status(409).json({
        message: 'username already exist'
      });
    } if (user && user.email === email) {
      return res.status(409).json({
        message: 'username already exist'
      });
    }
    next();
  });
};

export const checkBusinessNameExist = (req, res, next) => {
  const { businessNmae } = req.body;
  Business.forEach((name) => {
    if (name && name.businessName === businessNmae) {
      return res.status(409).json({
        message: 'business name already exist'
      });
    }
    next();
  });
};

export const checkAuthorizedUser = (req, res, next) => {
  const { userId } = req.body;
  const { id } = req.params;
  for (let i = 0; i < Business.length; i += 1) {
    if (Business[i].id === id && Business[i].userId !== userId) {
      return res.status(403).json({
        message: 'you are not allowed to perform this operation'
      });
    }
    next();
  }
};

