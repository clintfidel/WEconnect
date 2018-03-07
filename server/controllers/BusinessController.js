import dummyDb from '../dummyModels/index';

const { Review, Category, Business } = dummyDb;

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
      message: 'you have successfully Rgistered this business',
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
      return res.status(403).json({
        status: false,
        message: 'Unauthorized useer'
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
          message: 'blog deleted successfully'
        });
      }
      return res.status(403).json({
        message: 'Unauthorized user!'
      });
    }
  }
}

export default BusinessController;
