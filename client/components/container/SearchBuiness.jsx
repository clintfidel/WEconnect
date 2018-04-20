import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import toastrOption from '../../utils/toastrOption';
import {
  searchBusinessAction,
  getAllCategoryAction,
  getAllBusinessAction
} from '../../actions/BusinessAction';

/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
class SearchBuiness extends Component {
  static defaultProps = {
    locations: [
      'ABIA', 'ADAMAWA', 'AKWA IBOM', 'ANAMBRA',
      'BAUCHI', 'BAYELSA', 'BENUE', 'BORNO',
      'CROSS RIVER', 'DELTA', 'EBONYI',
      'EDO', 'EKITI', 'ENUGU', 'FCT-ABUJA', 'GOMBE',
      'IMO', 'JIGAWA', 'KADUNA', 'KANO', 'KATSINA',
      'KEBBI', 'KOGI', 'KWARA', 'LAGOS', 'NASSARAWA', 'NIGER', 'OGUN', 'ONDO',
      'OSUN', 'OYO', 'PLATEAU', 'RIVERS', 'SOKOTO', 'TARABA', 'YOBE', 'ZAMFARA'
    ]
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
      searchErrorStatus: false,
      searchError: false,
      name: '',
      location: '',
      category: ''
    };
    // this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * @description - gets all businesses
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.getAllCategoryAction()
      .then(() => {
        this.props.getAllBusinessAction();
      });
  }

  /**
   * @description - handles the business search
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  handleSearch(event) {
    console.log(event.target.value);
    event.preventDefault();
    if (event.target.value !== '') {
      this.setState({
        [event.target.name]: event.target.value
      }, () =>
        this.props.searchBusinessAction(
          this.state.location,
          this.state.category
        ));
    } if (event.target.value === "Select From...") {
      this.setState({
        [event.target.name]: ''
      }, () =>
        this.props.getAllBusinessAction());
    } else {
      this.props.getAllBusinessAction();
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
        <form
          action="#"
          method="get"
          role="form"
          onSubmit= {this.handleSearch} >
          <div className="container" id="contain-form">
            <div className="row search">
              <input type="text"
                name="name"
                onChange={this.handleSearch}
                placeholder="search business by name...." />
              <select
                className="custom-select"
                name="location"
                onChange={this.handleSearch}
                id="">
                <option value="Select From...">
                  Search by location
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
              <select
                type="select"
                className="custom-select"
                name="category"
                value={this.state.category}
                onChange= {this.handleSearch}
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
              <button type="submit">
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SearchBuiness.propTypes = {
  getAllCategoryAction: PropTypes.func,
  getAllBusinessAction: PropTypes.func,
  allCategories: PropTypes.array,
  locations: PropTypes.array,
  allBusiness: PropTypes.array,
  searchBusinessAction: PropTypes.func
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    allCategories: state.BusinessReducer.categories,
    allBusiness: state.BusinessReducer.businesses
  };
};
export default connect(
  mapStateToProps,
  {
    searchBusinessAction,
    getAllCategoryAction,
    getAllBusinessAction
  }
)(SearchBuiness);
