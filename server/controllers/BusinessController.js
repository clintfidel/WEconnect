import dummyDb from '../dummyModels/index';

const { Business } = dummyDb;

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
}

export default BusinessController;
