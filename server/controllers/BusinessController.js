import dummyDb from '../dummyModels/index';

const { Review, Business } = dummyDb;

/**
 *
 *@class BusinessController
 *@classdesc creates a BusinessController Class
 */

class BusinessController {
  /**
   * Register a user's business on the platform
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the user created or error message
   * @memberof UserController
   */
  static addbusiness(req, res) {
    const {
      businessName, businessDetails, businessLocation, categoryId, userId
    } = req.body;
    const businessAdded = {
      id: Business.length + 1,
      businessName,
      businessDetails,
      businessLocation,
      categoryId,
      userId
    };
    Business.push(businessAdded);
    return res.status(201).json({
      message: 'you have successfully Registered this business',
      newBusiness: Business[Business.length - 1]
    });
  }

  /**
   * @description - Updates a user's business profile
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @memberOf UserController
   *
   * @return {object} - status code and  message
   */
  static updateBusiness(req, res) {
    const {
      businessName, businessDetails, businessLocation, categoryId, userId
    } = req.body;
    let business;
    for (let i = 0; i < Business.length; i += 1) {
      if (Business[i].id === parseInt(req.params.id, 10)) {
        Business[i].businessName = businessName;
        Business[i].businessDetails = businessDetails;
        Business[i].businessLocation = businessLocation;
        Business[i].categoryId = categoryId;
        Business[i].userId = userId;
        business = Business[i];
        return res.status(200).json({
          message: 'You have successfully updated your Business',
          business
        });
      }
      return res.status(400).json({
        message: 'You are currently making a bad request'
      });
    }
  }

  /**
   * @description - Deletes a user's business profile
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @memberOf UserController
   *
   * @return {object} - status code and  message
   */
  static deleteBusiness(req, res) {
    for (let i = 0; i < Business.length; i += 1) {
      if (Business[i].id === Number(req.params.id)) {
        Business.slice(i, 1);
        return res.status(200).json({
          message: 'Business deleted successfully'
        });
      }
      return res.status(400).json({
        message: 'You are currently making a bad request'
      });
    }
  }

  /**
   * @description - Gets all user's business profile
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @memberOf UserController
   *
   * @return {object} - status code and  message
   */
  static getAllBusiness(req, res) {
    return res.status(200).send({
      status: 'Success',
      Business,
    });
  }

  /**
   * @description - Gets one user business profile
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @memberOf UserController
   *
   * @return {object} - status code and  message
   */
  static getOneBusiness(req, res) {
    for (let i = 0; i < Business.length; i += 1) {
      if (Business[i].id === parseInt(req.params.id, 10)) {
        return res.status(200).json({
          status: 'success',
          Business: Business[i]
        });
      }
      return res.status(400).json({
        message: 'No business with that id found'
      });
    }
  }

  /**
   * @description - Review user's business profile
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @memberOf UserController
   *
   * @return {object} - status code and  message
   */
  static reviewBusiness(req, res) {
    const { content, userId } = req.body;
    const reviewAdded = {
      id: Review.length + 1,
      businessId: req.params.businessId,
      userId,
      content
    };
    for (let i = 0; i < Business.length; i += 1) {
      if (Business[i].id === parseInt(req.params.businessId, 10)) {
        Review.push(reviewAdded);
        return res.status(201).json({
          message: 'you have successfully reviewed this business',
          review: Review[Review.length - 1]
        });
      }
      return res.status(400).json({
        message: 'You are currently making a bad request'
      });
    }
  }
  /**
   * @description - Get one review for business profile
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @memberOf UserController
   *
   * @return {object} - status code and  message
   */

  // static getOneReview(req, res) {
  //   for (let i = 0; i < Review.length; i += 1) {
  //     if (Review[i].id === parseInt(req.params.id, 10)) {
  //       return res.status(200).json({
  //         status: 'success',
  //         review: Review[i]
  //       });
  //     }
  //   }
  // }

  /**
   * @description - Admin add category for business profile
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @memberOf UserController
   *
   * @return {object} - status code and  message
   */
  // static addCategory(req, res) {
  //   const { name, description } = req.body;
  //   const categoryAdded = {
  //     id: Category.length + 1,
  //     name,
  //     description
  //   };
  //   Category.push(categoryAdded);
  //   return res.status(201).json({
  //     message: 'you have successfully added a new category',
  //     category: Category[Category.length - 1]
  //   });
  // }
}

export default BusinessController;
