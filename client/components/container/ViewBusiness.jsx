import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import NavBar from '../presentational/common/NavBar';
import BusinessInfo from '../presentational/BusinessInfo';
import Footer from '../presentational/common/Footer';
import {
  viewBusinessAction,
  deleteBusinessAction,
  getAllCategoryAction
} from '../../actions/BusinessAction';

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
      redirectUser: false,
    };
    this.deleteBusiness = this.deleteBusiness.bind(this);
  }

  /**
   * @description - gets business data
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.getAllCategoryAction();
    this.props.viewBusinessAction(this.props.match.params.id)
      .catch((error) => {
        if (error) {
          this.setState({
            redirectUser: true
          });
        }
      });
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
              this.props.history.push('/all-business/');
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
      userId, details, name, Category, location, views
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
          key={Math.random() * 10}
          userAuth={Number(this.props.auth.id)}
          allCategories={this.props.categories}
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
      //change redirect page back to 404 not found page
      this.state.redirectUser ?
        <Redirect to="/" /> :
        <div>
          <NavBar />
          <div className="business-body">
            {this.displayBusiness()}
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
  categories: state.BusinessReducer.categories

});
export default connect(
  mapStateToProps,
  {
    viewBusinessAction,
    getAllCategoryAction,
    deleteBusinessAction
  }
)(ViewBusiness);