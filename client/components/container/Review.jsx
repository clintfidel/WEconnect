import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import toastrOption from '../../utils/toastrOption';
import { allReviewAction, addReviewAction } from '../../actions/ReviewsAction';

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
      disableBtn: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayReviews = this.displayReviews.bind(this);
  }

  /**
   * @description - get all reviews
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.allReviewAction(this.props.id);
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
      .then((message) => {
        toastrOption();
        toastr.success(message);
      })
      .catch(message => {
        toastrOption();
        toastr.error(message);
      });
    this.setState({
      comments: ''
    });
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
            <p>{review.comments}</p>
            <small className="text-muted">
              created at:
              {moment(review.createdAt).format('Do MMMM YYYY HH:mm')}
            </small>
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
                  <form
                    action="#"
                    method="post"
                    role="form"
                    onSubmit={this.onSubmit}>
                    <textarea
                      name="comments"
                      value={this.state.comments}
                      onChange= {this.onChange} />

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
  allReviewAction: PropTypes.func.isRequired,
  addReviewAction: PropTypes.func.isRequired,
  reviews: PropTypes.array
};

const mapStateToProps = (state) => ({
  reviews: state.ReviewsReducer.reviews
});

export default connect(
  mapStateToProps,
  { allReviewAction, addReviewAction }
)(Review);
