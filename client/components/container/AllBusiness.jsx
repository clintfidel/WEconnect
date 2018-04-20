import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../presentational/common/NavBar';
import Businesses from '../presentational/Businesses';
import Footer from '../presentational/common/Footer';
import { getAllBusinessAction } from '../../actions/BusinessAction';
import SearchBusiness from '../container/SearchBuiness';

/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
class AllBusiness extends Component {
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
      loader: false
    };
  }

  /**
   * @description - gets all businesses
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.getAllBusinessAction();
  }

  /**
   * @description render - renders business details
   *
   * @return {object} returns an object
   *
   */
  renderAllBusiness() {
    const allBusiness = this.props.businesses;
    if (allBusiness.length < 1) {
      console.log('I got here');
      return (<div className="not-found"
        style={{ textAlign: 'center', paddingTop: 50 }}>
        <h2>No Business found!!</h2>
      </div>);
    } else {
      return (
        allBusiness.map((business) => (
          <Businesses
            name={business.name}
            details={business.details}
            location={business.location}
            categoryId={business.categoryId}
            views={business.views}
            userId={business.userId}
            id={business.id}
            key={business.id}/>
        ))
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
      <div>
        <NavBar />
        <div>
          <div className="main-business">
            <SearchBusiness
              renderAllBusiness={this.renderAllBusiness()}/>
            <div className="jumbotron">
              <h1>All Businesses</h1>
              {this.renderAllBusiness()}
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

AllBusiness.propTypes = {
  getAllBusinessAction: PropTypes.func.isRequired,
  businesses: PropTypes.array
};
const mapStateToProps = (state) => ({
  businesses: state.BusinessReducer.businesses
});
export default connect(mapStateToProps, { getAllBusinessAction })(AllBusiness);
