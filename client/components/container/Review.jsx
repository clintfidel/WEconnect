import React, { Component } from 'react';
import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import toastrOption from '../../utils/toastrOption';
import { addReviewAction } from '../../actions/ReviewsAction';
import { rateBusiness } from '../../actions/BusinessAction';

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
      disableBtn: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayReviews = this.displayReviews.bind(this);
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

  ratingChanged = (newRating) => {
    this.setState(() => (
      { rate: newRating }
    ));
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
      allReviews.map((review) => (
        <div key={review.id}>
          <div className="comment-contents">
            <a href="#" className="comment-author" title="Comment Author">
              <h4>{review.User.username}</h4>
            </a>
            <p className="word-wrap">{review.comments}</p>
            <small className="text-muted">
              created at:
              {moment(review.createdAt).format('Do MMMM YYYY - HH:mm')}
            </small>
            <ReactStars
            count={5}
            size={17}
            edit={false}
            value={Number(review.rate)}
          /> 
          </div>
        </div>
      ))
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
                  {
                    this.displayReviews()
                  }
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
                  <form
                    action="#"
                    method="post"
                    role="form"
                    onSubmit={this.onSubmit}>
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
  count: state.ReviewsReducer.count
});

export default connect(
  mapStateToProps,
  { addReviewAction, rateBusiness }
)(Review);
