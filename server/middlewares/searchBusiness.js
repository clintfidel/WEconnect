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
   * @param {function} next - calls the next finction
   *
   * @return {Object} - Success message
   *
   * ROUTE: Get:/api/v1/business/?location=location
   */
export const searchBusiness = (req, res, next) => {
  const { location, category, name } = req.query;
  const searchLocation = location;
  const searchCategory = category;
  const searchName = name;
  const serverMessage = {
    message: 'Internal sever error'
  };
  if (searchLocation && searchCategory) {
    Business
      .findAndCountAll({
        where: {
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
        },
        {
          model: database.Review,
          attributes: ['rate']
        }
        ],

      })
      .then((businesses) => {
        checkBusinessResponse(businesses, res);
      })
      .catch(() => res.status(500).send(serverMessage));
  } else if (searchName) {
    Business
      .findAndCountAll({
        where: { name: { ilike: `%${searchName}%` } },
        include: [{
          model: database.User,
          attributes: ['username']
        },
        {
          model: Category,
          attributes: ['category']
        },
        {
          model: database.Review,
          attributes: ['rate']
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
        where: { '$Category.category$': { ilike: `%${searchCategory}%` } },
        include: [{
          model: database.User,
          attributes: ['username']
        },
        {
          model: Category,
          attributes: ['category']
        },
        {
          model: database.Review,
          attributes: ['rate']
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
        where: { location: { ilike: `%${searchLocation}%` } },
        include: [{
          model: database.User,
          attributes: ['username']
        },
        {
          model: Category,
          attributes: ['category']
        },
        {
          model: database.Review,
          attributes: ['rate']
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

/**
   * @description - User gets all  user businessess based on search
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @param {function} next - calls the next finction
   *
   * @return {Object} - Success message
   *
   * ROUTE: Get:/api/v1/business/?location=location
   */
export const searchUserBusiness = (req, res, next) => {
  const { name, location, category } = req.query;
  const { id } = req.decoded.currentUser;
  const searchName = name;
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
                  { userId: id },
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
        },
        {
          model: database.Review,
          attributes: ['rate']
        }
        ],

      })
      .then((businesses) => {
        checkBusinessResponse(businesses, res);
      })
      .catch(() => res.status(500).send(serverMessage));
  } else if (searchName) {
    Business
      .findAndCountAll({
        where: {
          $and: [
            { userId: id },
            { name: { ilike: `%${searchName}%` } }
          ]
        },
        include: [{
          model: database.User,
          attributes: ['username']
        },
        {
          model: Category,
          attributes: ['category']
        },
        {
          model: database.Review,
          attributes: ['rate']
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
        {
          $and: [
            { userId: id },
            { '$Category.category$': { ilike: `%${searchCategory}%` } },
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
  } else if (searchLocation) {
    Business
      .findAndCountAll({
        where:
        {
          $and: [
            { userId: id },
            { location: { ilike: `%${searchLocation}%` } },
          ]
        },
        include: [{
          model: database.User,
          attributes: ['username']
        },
        {
          model: Category,
          attributes: ['category']
        },
        {
          model: database.Review,
          attributes: ['rate']
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

