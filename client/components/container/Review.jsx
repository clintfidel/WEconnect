import React, { Component } from 'react';
import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import toastrOption from '../../utils/toastrOption';
import { addReviewAction, updateReviewAction } from '../../actions/ReviewsAction';
// import { rateBusiness } from '../../actions/BusinessAction';

/* eslint-disable */

/**
 * @class Signup
 *
 * @classdesc user post review
 *
 */
class Review extends Component {
  /**
   * constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      redirectUser: false,
      comments: '',
      rate: 0,
      reviewId: '',
      disableBtn: true,
      toggleEdit: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayReviews = this.displayReviews.bind(this);
    this.toggleEditOnClick = this.toggleEditOnClick.bind(this);
    this.closeToggleEdit = this.closeToggleEdit.bind(this);
    this.updateReview = this.updateReview.bind(this);



  }

  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === 'comments' && event.target.value.trim() === '') {
      this.setState({
        disableBtn: true
      });
      return false;
    } else {
      this.setState({
        disableBtn: false
      });
    }
    return true;
  }

  /**
   * @description - handles the onSubmit event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.addReviewAction(this.props.id, this.state)
      .catch((message) => {
        toastrOption();
        toastr.error(message);
      })
    this.setState({
      comments: '',
      rate: ''
    });
  }

  /**
  * @description - updates review
  *
  * @param  {object} event the event for the content field
  *
  * @return {void}
  */
  updateReview(event) {
    event.preventDefault();
    this.props.updateReviewAction(this.state.reviewId, this.state)
    .then(() => {
      this.setState({
        comments: '',
        rate: '',
        toggleEdit: false
      })
    })
      .catch((message) => {
        toastrOption();
        toastr.error(message);
      })
  }

  ratingChanged = (newRating) => {
    this.setState(() => (
      { rate: newRating }
    ));
  }

  toggleEditOnClick(reviewId) {
    this.setState({
      toggleEdit: !this.state.toggleEdit, reviewId
    })
  }
  closeToggleEdit() {
    this.setState({
      toggleEdit: false
    })
  }
  /**
   * @description displayReviews - renders business reviews
   *
   * @return {object} returns an object
   *
   */
  displayReviews() {
    const allReviews = this.props.reviews;
    if (allReviews.length === 0) {
      return (<div className="comment-contents">No reviews found!</div>);
    }
    return (
      allReviews.map((review) => {
        const reviewBox = <div className="comment-contents">
      <i onClick={() => this.toggleEditOnClick(review.id)}
        className="fas fa-edit edit-review">
      </i>
      <a href="#" className="comment-author" title="Comment Author">
        <h4>{review.User.username}</h4>
      </a>
      <p className="word-wrap">{review.comments}</p>
      <small className="text-muted">
      {review.createdAt === review.updatedAt ? `created at: ${moment(review.createdAt).format('Do MMMM YYYY - HH:mm')}`: `updated at: ${moment(review.updatedAt).format('Do MMMM YYYY - HH:mm')}`}
      </small>
      <ReactStars
        count={5}
        size={17}
        edit={false}
        value={Number(review.rate)}
      />
    </div>;
    const reviewEditForm = <div className="comment-contents" key={review.id}>
      <form
        action="#"
        method="post"
        role="form"
        onSubmit={this.updateReview}>
        <textarea
          className="editReview-textarea"
          name="comments"
          defaultValue={this.props.reviews.comments}
          onChange={this.onChange}
          required />
        <div className="edit-stars">
          <ReactStars
            count={5}
            defaultValue={this.props.reviews.rate}
            onChange={this.ratingChanged}
            size={15}
            half={false}
            color2={'#ffd700'}
            value={this.state.rate}
          />
        </div>
        <button
          onClick={this.closeToggleEdit}
          type="button"
          className="btn">
          cancel
  </button>
        <button
          type="submit"
          className="btn edit-button">
          save
  </button>
      </form>
    </div>
        if (this.state.toggleEdit && this.state.reviewId === review.id) {
          return (<div key={review.id}>
        {console.log(this.state.reviewId, '=====>')}
        {reviewEditForm} 
        </div>)
        } else {
          return (<div key={review.id}>
            {reviewBox}
          </div>)
        }
      })
    );
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    return (
      <div>
        <div className="bus-info-reviews">
          <h3>Reviews</h3>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="post-form">
                    <div>
                      {
                        this.displayReviews()
                      }
                    </div>
                  {this.props.count > 5 ?
                    <button style={{
                      float: 'right',
                      padding: '8px',
                      backgroundColor: '#15b78d',
                      color: 'white',
                      borderRadius: '5px',
                      outline: 'none'
                    }} onClick={this.props.moreReviews}>
                      Load More
                    </button> : ''}
                  {
                    
                    this.state.toggleEdit ? '' :
                      <form
                        action="#"
                        method="post"
                        role="form"
                        onSubmit={this.onSubmit}>
                        {console.log(this.props.reviews.comments, '===>')}
                        <textarea
                          name="comments"
                          value={this.state.comments}
                          onChange={this.onChange}
                          required />
                        <div>
                          <ReactStars
                            count={5}
                            onChange={this.ratingChanged}
                            size={20}
                            color2={'#ffd700'}
                            half={false}
                            value={this.state.rate}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={this.state.disableBtn}
                          className="btn send-button">
                          Add review
                    </button>
                      </form>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  id: PropTypes.number,
  addReviewAction: PropTypes.func.isRequired,
  reviews: PropTypes.array,
  moreReviews: PropTypes.func,
  count: PropTypes.number,
};

const mapStateToProps = (state) => ({
  reviews: state.ReviewsReducer.reviews,
  count: state.ReviewsReducer.count,
  auth: state.AuthReducer.user
});

export default connect(
  mapStateToProps,
  { addReviewAction, updateReviewAction }
)(Review);
