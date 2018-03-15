import omit from 'lodash/omit';
import database from '../models';

const { Business, Review } = database;

class BusinessController {
  /**
   * @description - User add a new business
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: POST: /api/v1/business/
   */

  static addBusiness(req, res) {
    Business
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        const omitValues = omit(req.businessInput, ['views']);
        if (!business) {
          Business.create(omitValues)
            .then((created) => {
              res.status(201).json({
                message: 'Business created successfully',
                businessProfile: created
              });
            });
        } else {
          return res.status(409).json({
            message: 'This business already exist'
          });
        }
      })
      .catch(() => res.status(500).json({
        message: 'Internal server error'
      }));
  }
  /**
   * @description - User updtaes his/her business
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: PUT: /api/v1/business/:businessId
   */

  static updateBusiness(req, res) {
    const { id } = req.decoded.currentUser;
    Business
      .findById(req.params.businessId)
      .then(() => {
        const omitValue = omit(req.businessInput, ['views', 'userId']);
        Business
          .update(omitValue, {
            where: {
              id: req.params.businessId
            },
            returning: true,
            plain: true
          })
          .then((business) => {
            if (!business) {
              res.status(404).json({
                mesaage: 'No business found'
              });
            }
            return res.status(200).json({
              status: 'success',
              message: 'Business successfully edited',
              data: {
                name: business[1].dataValues.name,
                details: business[1].dataValues.details,
                location: business[1].dataValues.location,
                categoryId: business[1].dataValues.categoryId,
                userId: id
              }
            });
          });
      });
  }

  /**
   * @description - User deletes his/her  business
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: Delete: /api/v1/business/:businessId
   */

  static deleteBusiness(req, res) {
    Business
      .findById(req.params.businessId)
      .then(() => {
        Business
          .destroy({
            where: {
              id: parseInt(req.params.businessId, 10)
            }
          })
          .then((business) => {
            if (business) {
              return res.status(200).json({
                message: 'Business deleted successfully'
              });
            }
            res.status(404).json({
              message: 'Your business could not be found'
            });
          })
          .catch(() => res.status(500).send('Internal server error'));
      });
  }

  /**
   * @description - User gets all business in the application
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: Get:/api/v1/business/
   */

  static getAllBusinessess(req, res) {
    Business
      .findAll({})
      .then((allBusiness) => {
        if (allBusiness.length > 1) {
          return res.status(200).send({
            Businesses: allBusiness
          });
        }
        return res.status(404).json({
          message: 'No business found'
        });
      })
      .catch(() => res.status(500).send('Internal server error'));
  }

  /**
   * @description - User gets one business in the application
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: Get:/api/v1/business/
   */

  static getOneBusiness(req, res) {
    Business
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (!business) {
          res.status(404).json({
            message: 'No business found'
          });
        }
        return res.status(200).json({
          message: 'Business found!',
          Business: business
        });
      })
      .catch(() => res.status(500).send('Internal sever Error'));
  }

  /**
   * @description - User adds review to business
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: Post:/api/v1/business/:businessId/reviews
   */

  static createReview(req, res) {
    const { id } = req.decoded.currentUser;
    Review
      .findOne({
        where: {
          businessId: req.params.businessId,
          userId: id
        }
      })
      .then(() => {
        Review
          .create(req.reviewInput)
          .then((review) => {
            const { businessId, comments } = review;
            res.status(201).json({
              message: 'You have successfully reviewed this business',
              Review: {
                userId: id,
                businessId,
                comments
              }
            });
          })
          .catch(() =>
            res.status(500).send('Internal server error'));
      });
  }
}

export default BusinessController;
