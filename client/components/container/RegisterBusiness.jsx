import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../presentational/common/NavBar';
import Footer from '../presentational/common/Footer';
import toastrOption from '../../utils/toastrOption';
import
{
  addBusinessAction,
  getAllCategoryAction
} from '../../actions/BusinessAction';


/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
class RegisterBusiness extends Component {
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
      name: '',
      details: '',
      location: '',
      categoryId: '',
      redirectUser: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description - gets all recipes
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.props.getAllCategoryAction();
  }
  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  /**
   * @description - handles the onSubmit event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.addBusinessAction(this.state)
      .then((message) => {
        this.setState({
          name: '',
          details: '',
          location: '',
          categoryId: ''
        });
        toastrOption();
        toastr.success(message);
        setTimeout(() => {
          this.setState({ redirectUser: true });
        }, 3000);
      })
      .catch((message) => {
        toastrOption();
        toastr.error(message);
      });
  }

  /**
   * @description render - renders recipe details
   *
   * @return {object} returns an object
   *
   */
  render() {
    const allcategories = this.props.categories;
    return (
      this.state.redirectUser ?
        <Redirect to="/all-business" /> :
        <div>
          <NavBar />
          <div className="full-page">
            <div className="content-page">
              <main className="register-business">
                <h2>Register Your Business</h2>
                <div className="panel-body">
                  <form
                    action="#"
                    method="post"
                    role="form"
                    onSubmit= {this.onSubmit}>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <input
                          type="text"
                          onChange={this.onChange}
                          name="name"
                          placeholder="Business Name"
                          className="form-control"
                          autoFocus="autofocus"
                          required />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <input
                          type="text"
                          onChange={this.onChange}
                          name="location"
                          placeholder="Business Location"
                          className="form-control"
                          required />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <select
                          type="select"
                          className="custom-select
                            form-control"
                          name="categoryId"
                          onChange= {this.onChange}
                          required>
                          <option>Choose category</option>
                          {allcategories.map((category) =>
                            (<option key={category.id}
                              value= {category.id}
                              id={`${category.category}`}>
                              {category.category}
                            </option>))
                          }
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <textarea
                          name="details"
                          onChange={this.onChange}
                          placeholder="Business-Details"
                          rows="4"
                          className="form-control"
                          type="text"
                          required />
                      </div>
                    </div>
                    <button type="submit" className="register-button">
                    Send
                    </button>
                  </form>
                </div>
              </main>
              <aside className="business-story">
                <div className="image-wrapper">
                  <img src="/placeholder.png" alt="image-placeholder" />
                </div>
                <a href="#" className="btn upload-button">Upload Image</a>
              </aside>
            </div>
          </div>
          <Footer />
        </div>
    );
  }
}

RegisterBusiness.propTypes = {
  getAllCategoryAction: PropTypes.func.isRequired,
  addBusinessAction: PropTypes.func.isRequired,
  categories: PropTypes.array


};
const mapStateToProps = (state) => ({
  categories: state.BusinessReducer.categories
});
export default connect(
  mapStateToProps,
  { addBusinessAction, getAllCategoryAction }
)(RegisterBusiness);
