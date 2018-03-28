import omit from 'lodash/omit';
import database from '../models';

const {
  Business, Category
}
= database;

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
            include: [{
              model: database.Category,
              attributes: ['category']
            }],
            returning: true,
            plain: true
          })
          .then((business) => {
            res.status(200).json({
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
          .then(() => {
            res.status(200).json({
              message: 'Business deleted successfully',
              id: Number(req.params.businessId)
            });
          })
          .catch(() => res.status(500).send('Internal server error'));
      });
  }

  /**
   * @description - User get all business in pages
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   */

  static getAllBusinessByPage(req, res, next) {
    const { pageNum } = req.query;
    if (pageNum) {
      const pageNumber = Number(pageNum);
      const message = 'Sorry no business found for this page';
      const limit = 10;
      let offset;
      let page;
      if (pageNumber === 0) {
        offset = 0;
      } else {
        page = pageNumber;
        offset = limit * (page - 1);
      }
      Business
        .findAndCountAll({
          order: [['views', req.query.order || 'DESC']],
          attributes: ['id', 'name', 'location', 'details', 'views'],
          include: [
            {
              model: Category,
              attributes: ['category']
            },
            {
              model: database.User,
              attributes: ['username', 'email']
            }
          ],
          limit,
          offset,
        })
        .then((business) => {
          const pages = Math.ceil(business.count / limit);
          if (!business.count) {
            return res.status(404).send({
              message: 'No Business found'
            });
          } else if (pageNumber > pages) {
            return res.status(404).send({ message });
          }
          return res.status(200).json({ business, count: business.count, pages });
        })
        .catch(() => {
          res.status(500).send('Internal sever Error');
        });
    } else {
      return next();
    }
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
        if (allBusiness.length > 0) {
          return res.status(200).send({
            status: 'Success',
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
      .findById(parseInt(req.params.businessId, 10))
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            message: 'no business found'
          });
        }
        business.increment('views')
          .then(() => business.reload());
        return res.status(200).json({
          message: 'Business found!',
          business: {
            businessId: business.id,
            businessName: business.name,
            businessLocation: business.location,
            businessCategory: business.categoryId,
            views: business.views + 1
          }
        });
      })
      .catch(() => res.status(500).send('Internal sever Error'));
  }
}

export default BusinessController;
