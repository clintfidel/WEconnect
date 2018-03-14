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
   * ROUTE: POST: /
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
}

export default BusinessController;
