
import database from '../models';

const { Business, Review } = database;

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
              if (reviews.length === 0) {
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
}

export default ReviewController;
