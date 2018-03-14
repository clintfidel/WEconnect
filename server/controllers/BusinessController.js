import omit from 'lodash/omit';
import database from '../models';

const { Business } = database;

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
   * @description - User add a new business
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
}

export default BusinessController;
