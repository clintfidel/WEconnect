import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
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
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * @description - gets all businesses
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.getAllBusinessAction(1);
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
      return (<div className="not-found"
        style={{ textAlign: 'center', paddingTop: 50 }}>
        <h2>No Business found!!</h2>
      </div>);
    }
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

  /**
   * @description - get all busineses in pages
   *
   * @param  {object} page the event for the content field
   *
   * @return {void} no return or void
   *
   */
  handlePageChange(page) {
    this.props.getAllBusinessAction(page.selected + 1);
  }

  /**
   * @description - handle pagination
   *
   * @param  {object} count the event for the content field
   *
   * @return {void} no return or void
   *
   */
  renderPagination(count) {
    if (this.props.count > 10 || this.props.businesses.length > 10) {
      return (
        <ReactPaginate
          previousLabel={
            <i className="page-link">Previous</i>
          }
          nextLabel={
            <i className="page-link">Next</i>
          }
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.props.count / 10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          initialPage={count}
          onPageChange={this.handlePageChange}
          containerClassName={'pagination justify-content-center'}
          subContainerClassName={"pages pagination"}
          activeClassName={'active'}
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
      <div>
        <NavBar/>
        <div>
          <div className="main-business">
            <SearchBusiness
              renderAllBusiness={this.renderAllBusiness()}/>
            <div className="jumbotron">
              <h1>All Businesses</h1>
              {this.renderAllBusiness()}
              {this.renderPagination(0)}
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
  businesses: PropTypes.array,
  count: PropTypes.number
};
const mapStateToProps = (state) => ({
  businesses: state.BusinessReducer.businesses,
  count: state.BusinessReducer.count
});
export default connect(
  mapStateToProps,
  { getAllBusinessAction }
)(AllBusiness);
