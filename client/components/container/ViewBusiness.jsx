import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavBar from '../presentational/common/NavBar';
import BusinessInfo from '../presentational/BusinessInfo';
import Footer from '../presentational/common/Footer';
import { viewBusinessAction } from '../../actions/BusinessAction';

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
      comments: '',
      redirectUser: false
    };
  }

  /**
   * @description - gets a particular business
   *
   * @return {void} no return or void
   */
  componentWillMount() {
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
          id={this.props.match.params.id}
          key={Math.random() * 10}
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
  viewBusinessAction: PropTypes.func.isRequired,
  business: PropTypes.object,
};
const mapStateToProps = (state) =>
  ({
    business: state.BusinessReducer.business,
  });
export default connect(
  mapStateToProps,
  { viewBusinessAction }
)(ViewBusiness);
