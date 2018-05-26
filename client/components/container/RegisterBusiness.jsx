import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../presentational/common/NavBar';
import Footer from '../presentational/common/Footer';
import toastrOption from '../../utils/toastrOption';
import locations from '../../mockData';
import
{
  addBusinessAction,
  getAllCategoryAction,
  imageUploadAction
} from '../../actions/BusinessAction';


/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
class RegisterBusiness extends Component {
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
      businessDetails: {
        name: '',
        details: '',
        location: '',
        categoryId: '',
        redirectUser: false,
        disableBtn: false,
        loader: false
      },
      image: '',
      imageUrl: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.imageUpload = this.imageUpload.bind(this);
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
    const { businessDetails } = this.state;
    businessDetails[event.target.name] = event.target.value;
    this.setState({
      businessDetails: businessDetails
    });
  }

  /**
   * @description - handles the upload image event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
 */
  imageUpload(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const fileReader = new FileReader();
    if (file) {
      fileReader.onload = () => {
        const newImage = new Image();
        newImage.src = fileReader.result;
        newImage.onload = () => {
          this.setState({
            image: file,
            imageUrl: newImage.src
          });
        };
      };
      fileReader.readAsDataURL(file);
    }
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
    this.setState({
      disableBtn: true,
      loader: true
    });
    if (!this.state.image) {
      this.props.addBusinessAction(this.state.businessDetails)
        .then((message) => {
          toastrOption();
          toastr.success(message);
          setTimeout(() => {
            this.setState({ redirectUser: true });
          }, 3000);
        })
        .catch((message) => {
          this.setState({
            disableBtn: false,
            loader: false
          });
          toastrOption();
          toastr.error(message);
        });
    }
    if (this.state.image !== '') {
      this.props.imageUploadAction(this.state.image)
        .then(() => {
          this.setState({
            businessDetails: {
              ...this.state.businessDetails,
              image: this.props.imageUrl
            }
          });
          this.props.addBusinessAction(this.state.businessDetails)
            .then((message) => {
              toastrOption();
              toastr.success(message);
              setTimeout(() => {
                this.setState({ redirectUser: true });
              }, 3000);
            })
            .catch((message) => {
              this.setState({
                disableBtn: false,
                loader: false
              });
              toastrOption();
              toastr.error(message);
            });
        });
    }
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
        <Redirect to="/userbusiness" /> :
        <div className="background">
          <NavBar />
          <div className="register-wrapper">
            <div className="row">
              <div className="col-sm-6">
                <div className="register-business text-center">
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
                          <select
                            type="select"
                            className="custom-select
                          form-control"
                            name="location"
                            onChange= {this.onChange}
                            required>
                            <option>Choose location</option>
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
                        <div className="input-group"
                          id="exampleFormControlFile1">
                          <span className="input-group-addon" />
                          <input type="file"
                            className="form-control-file"
                            id="upload-business"
                            onChange={this.imageUpload}
                            name="image"
                            accept=".jpg, .png, .jpeg"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon" />
                          <textarea
                            name="details"
                            onChange={this.onChange}
                            placeholder="Business-Details"
                            rows="6"
                            className="form-control"
                            type="text"
                            required />
                        </div>
                      </div>
                      <button type="submit"
                        disabled={this.state.disableBtn}
                        className="btn register-button">
                        {this.state.loader ? <i className="fa fa-circle-o-notch fa-spin" /> : 'Send'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="image-wrapper">
                  {
                    !this.state.imageUrl ?
                      <img alt="User Pic" src="/images/placeholder.png"
                        className="img-fluid"/> :
                      <img alt="User Pic"
                        src=
                          {this.state.imageUrl}
                        className="img-fluid mb-2 mt-2"/>
                  }
                </div>
              </div>

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
  imageUploadAction: PropTypes.func.isRequired,
  categories: PropTypes.array,
  locations: PropTypes.array,
  imageUrl: PropTypes.string,

};
const mapStateToProps = (state) => ({
  categories: state.BusinessReducer.categories,
  imageUrl: state.BusinessReducer.imageUrl
});
export default connect(
  mapStateToProps,
  {
    addBusinessAction,
    getAllCategoryAction,
    imageUploadAction
  }
)(RegisterBusiness);
