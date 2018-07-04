import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import locations from '../../mockData';
import {
  searchBusinessAction,
  searchUserBusinessAction,
  getAllBusinessAction,
  getAllUserBusinessAction
} from '../../actions/BusinessAction';
/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
class SearchBuiness extends Component {
  static defaultProps = {
    locations
  }
  /**
   * constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @param  {object} defaultProps the properties of the class component
   *
   * @return {void} no return or void
   *
   */
  constructor(props, defaultProps) {
    super(props, defaultProps);
    this.state = {
      name: '',
      location: '',
      category: '',
      disableBtn: false
    };
    this.baseState = this.state;
    this.handleSearch = this.handleSearch.bind(this);
    this.onClick = this.onClick.bind(this);
  }


  /**
   * @description - handles the onclick event
   *
   * @param  {object} event -the event for the content field
   *
   * @return {void}
   */
  onClick() {
    this.setState(this.baseState, () =>
      this.props.getAllBusinessAction(1));
    this.props.getAllUserBusinessAction(1);
  }
  /**
   * @description - handles the business search
   *
   * @param  {object} event -the event for the content field
   *
   * @return {void}
   */
  handleSearch(event) {
    if (event.target.name === 'name') {
      if (event.target.value === '') {
        this.setState({
          disableBtn: false,
          name: ''
        });
      } else {
        this.setState({
          disableBtn: true
        });
      }
    }

    const locationPath = this.props.location.pathname;
    event.preventDefault();
    const { name, location, category } = this.state;
    const { value } = event.target;
    if (event.target.value !== '' &&
    locationPath === "/all-business") {
      this.setState({
        [event.target.name]: event.target.value
      }, () =>
        this.props.searchBusinessAction(
          name,
          location,
          category
        ));
    }
    if (event.target.value !== '' &&
    locationPath === "/userbusiness") {
      this.setState({
        [event.target.name]: event.target.value
      }, () =>
        this.props.searchUserBusinessAction(
          name,
          location,
          category
        ));
    }
    if (value === "Select From..." && locationPath === "/userbusiness") {
      this.setState({
        [event.target.name]: ''
      }, () => {
        this.props.getAllUserBusinessAction(1);
      });
    } else if (value === "Select From..." && locationPath === "/all-business") {
      this.props.getAllBusinessAction(1);
    }
    if (value === "" &&
    locationPath === "/all-business") {
      this.props.getAllBusinessAction(1);
    } else if (value === "" &&
    locationPath === "/userbusiness") {
      this.props.getAllUserBusinessAction(1);
    }
  }


  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    const { onClick, handleSearch } = this;
    const {
      disableBtn,
    } = this.state;
    return (
      <div className="container">
        <div className="contain-form">
          <div className="row">
            <div className="col-sm-4">
              <input
                className="search-input"
                type="text"
                name="name"
                onChange={handleSearch}
                placeholder="search business by name...." />
            </div>
            <div className="col-sm-3">
              <select
                type="select"
                className="custom-select"
                name="location"
                disabled={disableBtn}
                value={this.state.location}
                onChange={handleSearch}
                required>
                <option value="Select From...">
              Choose location
                </option>
                {this.props.locations.map((location, index) => (
                  <option
                    key={index}
                    value={location}
                    id={`${location}`}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-3">
              <select
                type="select"
                className="custom-select"
                name="category"
                disabled={disableBtn}
                value={this.state.category}
                onChange= {handleSearch}
                required>
                <option value="Select From...">
                  Choose category
                </option>
                {this.props.allCategories.map((category) =>
                  (<option key={category.id}
                    value={category.category}
                    id={`${category.category}`}>
                    {category.category}
                  </option>))
                }
              </select>
            </div>
            <div className="col-sm-2">
              <button
                className="reset-button"
                onClick={onClick}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchBuiness.propTypes = {
  getAllCategoryAction: PropTypes.func,
  getAllBusinessAction: PropTypes.func,
  getAllUserBusinessAction: PropTypes.func,
  allCategories: PropTypes.array,
  location: PropTypes.object,
  locations: PropTypes.array,
  allBusiness: PropTypes.array,
  searchBusinessAction: PropTypes.func,
  searchUserBusinessAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  allCategories: state.BusinessReducer.categories,
  allBusiness: state.BusinessReducer.businesses,
});
export default withRouter(connect(
  mapStateToProps,
  {
    searchBusinessAction,
    searchUserBusinessAction,
    getAllBusinessAction,
    getAllUserBusinessAction
  }
)(SearchBuiness));

