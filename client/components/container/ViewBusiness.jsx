import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import BusinessInfo from '../presentational/BusinessInfo';
import NavBar from '../presentational/common/NavBar';
import Footer from '../presentational/common/Footer';
import Loader from '../presentational/common/Loader';
import {
  viewBusinessAction,
  deleteBusinessAction,
  getAllCategoryAction,
} from '../../actions/BusinessAction';
import { allReviewAction } from '../../actions/ReviewsAction';


/**
 * @class ViewBusiness
 *
 * @classdesc user view one Buisness
 *
 */
class ViewBusiness extends Component {
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
      reviewsNumber: 1,
      redirectUser: false,
    };
    this.deleteBusiness = this.deleteBusiness.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @description - gets business data
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.setState({
      loader: true
    });
    this.props.getAllCategoryAction();
    this.props.viewBusinessAction(this.props.match.params.id)
      .then(() => {
        this.props.allReviewAction(this.props.match.params.id, this.state.reviewsNumber);
        this.setState({
          loader: false
        });
      })
      .catch((error) => {
        if (error) {
          this.setState({
            redirectUser: true
          });
        }
      });
  }

  /**
   * @description - handles the onclick event
   *
   * @param  {object} event -the event for the content field
   *
   * @return {void}
   */
  onClick(event) {
    event.preventDefault();
    this.setState(
      {
        reviewsNumber: this.state.reviewsNumber + 1
      },
      () =>
        this.props.allReviewAction(this.props.match.params.id, this.state.reviewsNumber)
    );
  }
  /**
   * @description deleteBusiness - details user's business
   *
   * @return {object} returns an object
   *
   */
  deleteBusiness() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this business!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          this.props
            .deleteBusinessAction(this.props.business.id)
            .then(() => {
              swal("oh! great! Your business has been deleted!", {
                icon: "success",
              });
            })
            .then(() => {
              this.props.history.push('/userbusiness');
            });
        } else {
          swal('Your Business Is still intact!!');
        }
      })
      .catch(err => {
        swal("Oops!", "Seems like we couldn't perform the action", "error");
      });
  }

  /**
   * @description displayBusiness - renders business details
   *
   * @return {object} returns an object
   *
   */
  displayBusiness() {
    const {
      userId, details, name, Category, location, views, image
    } = this.props.business;
    if (Object.keys(this.props.business).length !== 0) {
      return (
        <BusinessInfo
          name={name}
          details={details}
          userId={userId}
          category={Category.category}
          location={location}
          views={views}
          id={+this.props.match.params.id}
          deleteHandler={this.deleteBusiness}
          moreReviews = {this.onClick}
          image={image}
          key={Math.random() * 10}
          userAuth={Number(this.props.auth.id)}
        />
      );
    }
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    return (
      this.state.redirectUser ?
        <Redirect to="/*" /> :
        <div>
          <NavBar />
          <div className="business-body">
            { this.state.loader ?
              <Loader size={'500px'} /> :
              <div>
                {this.displayBusiness()}
              </div>
            }
          </div>
          <Footer />
        </div>
    );
  }
}

ViewBusiness.propTypes = {
  getAllCategoryAction: PropTypes.func.isRequired,
  viewBusinessAction: PropTypes.func.isRequired,
  deleteBusinessAction: PropTypes.func.isRequired,
  allReviewAction: PropTypes.func.isRequired,
  categories: PropTypes.array,
  business: PropTypes.object,
  history: PropTypes.object,
  auth: PropTypes.object,
  match: PropTypes.object
};
const mapStateToProps = (state) => ({
  business: state.BusinessReducer.business,
  auth: state.AuthReducer.user.currentUser,
  isAuthenticated: state.AuthReducer.authenticated,
  categories: state.BusinessReducer.categories,

});
export default connect(
  mapStateToProps,
  {
    viewBusinessAction,
    getAllCategoryAction,
    deleteBusinessAction,
    allReviewAction,
  }
)(ViewBusiness);
