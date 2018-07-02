
import database from '../models';

const { Review, User } = database;
/**
 * @class ReviewController
 *
 * @classdesc contains all review methods (post,get)
 *
 */
class ReviewController {
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
    Review
      .create(req.reviewInput)
      .then((createReview) => {
        createReview.reload({
          include: [{
            model: database.User,
            attributes: ['username']
          }]
        })
          .then((review) => res.status(201).json({
            message: 'You have successfully reviewed this business',
            Review: review
          }))
          .catch(() =>
            res.status(500).send({
              message: 'Internal server error'
            }));
      });
  }

  /**
   * @description - User updtaes review to business
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {Object} - Success message
   *
   * ROUTE: Post:/api/v1/business/:businessId/reviews
   */
  static updateReview(req, res) {
    const { id } = req.decoded.currentUser;
    Review
      .findOne({
        where: {
          id: req.params.reviewId
        }
      })
      .then((editReview) => {
        if (!editReview) {
          return res.status(400).json({
            message: 'review Id not found'
          });
        }
        editReview
          .update({
            comments: req.body.comments || editReview.comments,
            rate: req.body.rate || editReview.rate,
            userId: id
          })
          .then((includeReview) => {
            includeReview.reload({
              include: [{
                model: database.User,
                attributes: ['username']
              }]
            })
              .then((review) => {
                res.status(200).json({
                  message: 'You have successfully updated this review',
                  review
                });
              });
          });
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
  static getAllReview(req, res) {
    const { pageNum } = req.query;
    if (pageNum) {
      const pageNumber = Number(pageNum);
      const message = 'Sorry no business found for this page';
      const limit = 5;
      let offset;
      let page;
      if (pageNumber === 0) {
        offset = 0;
      } else {
        page = pageNumber;
        offset = limit * (page - 1);
      }
      Review
        .findAndCountAll({
          order: [['createdAt', 'DESC']],
          where: {
            businessId: req.params.businessId
          },
          include: [
            {
              model: User,
              attributes: ['username'],
            }
          ],
          limit,
          offset,
        })
        .then((reviews) => {
          const pages = Math.ceil(reviews.count / limit);
          if (reviews.count < 1) {
            return res.status(200).send({
              reviews
            });
          } else if (pageNumber > pages) {
            return res.status(404).send({ message: message });
          }
          return res.status(200).send({
            status: 'success',
            reviews,
            count: reviews.count,
            pages
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: 'Internal server error'
          });
        });
    }
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
   * ROUTE: GET: /api/v1/business/rate/:businessId
   */
  static getAverageRatings(req, res) {
    Review
      .findAndCountAll({
        where: {
          businessId: req.params.businessId
        }
      })
      .then((averageRating) => {
        if (averageRating) {
          const sum = averageRating.rows.reduce((addedvalue, currentValue) => addedvalue + currentValue.rate, 0);
          const calculateAverage = sum / averageRating.rows.length;
          return res.status(200).send({
            message: 'average rating',
            averageRating: Number(calculateAverage.toFixed(1)),
          });
        } else {
          return res.status(200).send(averageRating);
        }
      })
      .catch(() => {
        res.status(500).send('Internal server Error');
      });
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
   * ROUTE: GET: /api/v1/business/rate/:businessId
   */
  static getAllRatingsPerNumber(req, res) {
    const result = [];
    const rates = [5, 4, 3, 2, 1];
    rates.forEach(async (value) => {
      const numberOfPeople = await Review
        .findAll({
          where: {
            rate: value,
            businessId: req.params.businessId
          }
        });
      result.push({
        value,
        rateNumber: numberOfPeople.length
      });
      if (value === 1) {
        return res.status(200).json(result);
      }
    });
  }
}

export default ReviewController;
