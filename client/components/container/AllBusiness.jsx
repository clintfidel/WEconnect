import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPagination from "react-paginate";
import { connect } from 'react-redux';
import NavBar from '../presentational/common/NavBar';
import Businesses from '../presentational/Businesses';
import Footer from '../presentational/common/Footer';
import {
  getAllBusinessAction,
  getAllCategoryAction
} from '../../actions/BusinessAction';
import SearchBusiness from '../container/SearchBuiness';
import Loader from '../presentational/common/Loader';

/**
 * @class AllBusiness
 *
 * @classdesc Get All Business
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
      loader: false,
      activePage: 1
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
    this.props.getAllBusinessAction(this.state.activePage)
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
    if (this.props.count > 10) {
      return (
        <div>
          <ReactPagination
            previousLabel={
              <i className="fas fa-angle-double-left" />
            }
            nextLabel={
              <i className="fas fa-angle-double-right" />
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
        </div>
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
          <SearchBusiness/>
          <div className="container card-container">
            { this.state.loader ?
              <Loader size={'250px'} /> :
              <div>
                <h1>All Businesses</h1>
                {this.renderAllBusiness()}
                {this.renderPagination(0)}
              </div>
            }
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

AllBusiness.propTypes = {
  getAllBusinessAction: PropTypes.func.isRequired,
  getAllCategoryAction: PropTypes.func.isRequired,
  businesses: PropTypes.array,
  count: PropTypes.number
};
const mapStateToProps = (state) => ({
  businesses: state.BusinessReducer.businesses,
  count: state.BusinessReducer.count
});
export default connect(
  mapStateToProps,
  { getAllBusinessAction, getAllCategoryAction }
)(AllBusiness);
