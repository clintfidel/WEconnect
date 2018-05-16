import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import NavBar from '../presentational/common/NavBar';
import Businesses from '../presentational/Businesses';
import Footer from '../presentational/common/Footer';
import {
  getAllUserBusinessAction,
  getAllCategoryAction
} from '../../actions/BusinessAction';
import SearchBusiness from '../container/SearchBuiness';
import Loader from '../presentational/common/Loader';

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
    this.setState({
      loader: true
    });
    this.props.getAllCategoryAction();
    this.props.getAllUserBusinessAction(1)
      .then(() => {
        this.setState({
          loader: false
        });
      });
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
      return (
        <div style={{ textAlign: 'center', paddingTop: 50 }}>
          <h2>No Business found!!</h2>
        </div>
      );
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
          key={business.id}
          owner={business.User.username}
          image={business.image}/>
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
    this.props.getAllUserBusinessAction(page.selected + 1);
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
    if (this.props.count > 10) {
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
          <div>
            <SearchBusiness/>
            <div className="container card-container">
              { this.state.loader ?
                <Loader size={'250px'} /> :
                <div>
                  <h1>My Businesses</h1>
                  {this.renderAllBusiness()}
                  {this.renderPagination(0)}
                </div>
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

AllBusiness.propTypes = {
  getAllUserBusinessAction: PropTypes.func.isRequired,
  getAllCategoryAction: PropTypes.func.isRequired,
  businesses: PropTypes.array,
  count: PropTypes.number
};
const mapStateToProps = (state) => ({
  businesses: state.BusinessReducer.userBusiness,
  count: state.BusinessReducer.count,
});
export default connect(
  mapStateToProps,
  {
    getAllUserBusinessAction,
    getAllCategoryAction
  }
)(AllBusiness);
