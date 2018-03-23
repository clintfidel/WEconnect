import database from '../models/';

const {
  Business, Category
} = database;

/**
   * @description - User gets all  businessess based on search
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: Get:/api/v1/business/?location=location
   */

const searchBusiness = (req, res, next) => {
  const { location, category } = req.query;
  const searchLocation = location;
  const searchCategory = category;
  if (searchLocation || searchCategory) {
    Business
      .findAll({
        where:
            {
              $or: [
                { location: { ilike: `%${searchLocation}%` } },
                { '$Category.category$': { ilike: `%${searchCategory}%` } }
              ]
            },
        include: [{
          model: database.User,
          attributes: ['username']
        },
        {
          model: Category,
          attributes: ['category']
        }
        ],

      })
      .then((business) => {
        if (business.length < 1) {
          return res.status(404).json({
            message: 'No match Business found!'
          });
        }
        return res.status(200).send({
          message: 'Business Found!',
          Businesses: business
        });
      })
      .catch(() => res.status(500).send('Internal sever error'));
  } else {
    return next();
  }
};

export default searchBusiness;
