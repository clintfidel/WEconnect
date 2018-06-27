import database from '../models';
import { createRate } from '../middlewares/validation';

const {
  Rating
} =
database;
/**
 * @class BusinessController
 *
 * @classdesc contains all business methods (post,get,delete,put)
 *
 */
class RatingsController {
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
  static rateArticles(req, res) {
    const { id } = req.decoded.currentUser;
    if (req.body.rate > 5) {
      return res.status(403).json('pls rate this article from 1-5');
    }
    Rating
      .findOne({
        where: {
          $and: [{ userId: id }, { businessId: req.params.budinessId }]
        }
      })
      .then((rates) => {
        if (!rates) {
          return Rating.create({
            userId: id,
            businessId: req.params.blogId,
            rate: req.body.rate
          })
            .then(() => {
              createRate(req.body.rate, res);
            });
        } else if (rates) {
          const { rate } = req.body;
          return Rating.update({ rate }, {
            where: {
              businessId: req.params.businessId
            }

          })
            .then(() => res.status(200).json('Thanks for your rating!'));
        }
      })
      .catch(() => {
        res.status(500).send('Internal server Error');
      });
  }
}
export default RatingsController;
