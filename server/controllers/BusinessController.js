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
    const omitValues = omit(req.businessInput, ['views']);

    Business.create(omitValues)
      .then((createbusiness) => {
        createbusiness.reload({
          include: [{
            model: database.Category,
            attributes: ['category']
          }]
        })
          .then((createdBusiness) => {
            res.status(201).json({
              message: 'Business created successfully',
              businessProfile: createdBusiness
            });
          });
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
          .then((category) => {
            category.reload({
              include: [{
                model: database.Category,
                attributes: ['category']
              }]
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
              })
              .catch(() => res.status(500).json({
                message: 'Internal server error'
              }));
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
          .then((createReview) => {
            createReview.reload({
              include: [{
                model: database.User,
                attributes: ['username']
              }]
            })
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
              });
          })
          .catch(() =>
            res.status(500).send('Internal server error'));
      });
  }

  /**
   * @description - User gets all review for a business
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: Get:/api/v1/business/:businessId/reviews
   */

  static getAllReviews(req, res) {
    Business
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (business) {
          const {
            id, name, location, categoryId
          } = business;
          return Review
            .findAll({
              where: {
                businessId: req.params.businessId
              }
            })
            .then((reviews) => {
              if (!reviews) {
                return res.status(404).json({
                  message: 'No review found for this business'
                });
              }
              return res.status(200).send({
                status: 'success',
                businessdata: {
                  id,
                  name,
                  location,
                  categoryId,
                  AllReviews: {
                    reviews
                  }
                }
              });
            })
            .catch(() => res.status(500).send('Internal server Error'));
        }
        return res.status(404).json({
          message: 'No business Found'
        });
      })
      .catch(() => res.status(500).send('Internal server Error'));
  }
  /**
   * @description - User view business
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: POST: /view/:businessId
   */
  static viewBusiness(req, res) {
    Business
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((views) => {
        if (!views) {
          return res.status(404).json({
            message: 'no blog found'
          });
        }
        views.increment('views')
          .then(() => views.reload());
        return res.status(200).json({
          message: 'you have successfully viewed this business',
          views: {
            businessName: views.name,
            businessLocation: views.location,
            businessCategory: views.categoryId,
            views: views.views + 1
          }
        });
      });
  }
}

export default BusinessController;
