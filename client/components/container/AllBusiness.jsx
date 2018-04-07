import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../presentational/common/NavBar';
import Businesses from '../presentational/Businesses';
import Footer from '../presentational/common/Footer';
import getAllBusiness from '../../actions/BusinessAction';
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
   * @description - gets all recipes
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.getAllBusiness();
  }

  /**
   * @description render - renders recipe details
   *
   * @return {object} returns an object
   *
   */
  renderAllBusiness() {
    const allBusiness = this.props.businesses;
    if (allBusiness < 1) {
      return (<div className="not-found">
        <h1>No article found</h1>
      </div>);
    }

    return (<div>
      <div className="main-business">
        <SearchBusiness />
        <div className="jumbotron">
          <h1>All Businesses</h1>
          {allBusiness.map((business) => (
            <Businesses
              name={business.name}
              details={business.details}
              location={business.location}
              categoryId={business.categoryId}
              views={business.views}
              userId={business.userId}
              key={business.id}/>
          ))
          }
        </div>
      </div>
    </div>
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
        <NavBar />
        <div>
          {this.renderAllBusiness()}
        </div>
        <Footer />
      </div>

    );
  }
}

AllBusiness.propTypes = {
  getAllBusiness: PropTypes.func.isRequired,
  businesses: PropTypes.array
};
const mapStateToProps = (state) => {
  console.log(state, '===>');
  return {
    businesses: state.BusinessReducer.businesses
  };
};
export default connect(mapStateToProps, { getAllBusiness })(AllBusiness);
