import database from '../models/';
import checkBusinessResponse from '../helper/checkBusinessResponse';

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
  const serverMessage = {
    message: 'Internal sever error'
  };
  if (searchLocation && searchCategory) {
    Business
      .findAndCountAll({
        where:
            {
              $and: [
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
      .then((businesses) => {
        checkBusinessResponse(businesses, res);
      })
      .catch(() => res.status(500).send(serverMessage));
  } else if (searchCategory) {
    Business
      .findAndCountAll({
        where:

          { '$Category.category$': { ilike: `%${searchCategory}%` } },

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
      .then((businesses) => {
        checkBusinessResponse(businesses, res);
      })
      .catch(() => res.status(500).send(serverMessage));
  } else if (searchLocation) {
    Business
      .findAndCountAll({
        where:

          { location: { ilike: `%${searchLocation}%` } },

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
      .then((businesses) => {
        checkBusinessResponse(businesses, res);
      })
      .catch(() => res.status(500).send(serverMessage));
  } else {
    return next();
  }
};

export default searchBusiness;
