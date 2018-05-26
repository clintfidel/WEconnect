
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

  // /**
  //  * @description - User gets all review for a business
  //  *
  //  * @param  {object} req - request
  //  *
  //  * @param  {object} res - response
  //  *
  //  * @return {Object} - Success message
  //  *
  //  * ROUTE: Get:/api/v1/business/:businessId/reviews
  //  */
  // static getAllReviews(req, res) {
  //   Review
  //     .findAll({
  //       where: {
  //         businessId: req.params.businessId
  //       },
  //       include: [
  //         {
  //           model: User,
  //           attributes: ['username']
  //         }
  //       ]
  //     })
  //     .then((reviews) => {
  //       res.status(200).send({
  //         status: 'success',
  //         allReviews: reviews
  //       });
  //     })
  //     .catch(() => res.status(500).send({
  //       message: 'Internal server Error'
  //     }));
  // }

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
          where: {
            businessId: req.params.businessId
          },
          include: [
            {
              model: User,
              attributes: ['username']
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
}

export default ReviewController;
