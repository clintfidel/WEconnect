import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editBusinessAction,
  imageUploadAction
}
  from '../../actions/BusinessAction';
import toastrOption from '../../utils/toastrOption';
import locations from '../../mockData';

/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
class EditModal extends Component {
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
    super(props);
    this.state = {
      redirectUser: false,
      image: '',
      loader: false,
      imageUrl: '',
      businessDetails: {
        name: this.props.business.name,
        details: this.props.business.details,
        categoryId: this.props.business.categoryId,
        location: this.props.business.location,
        image: this.props.business.image
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.imageUpload = this.imageUpload.bind(this);
  }


  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onChange(event) {
    if (event.target.value === "Select From...") {
      toastrOption();
      toastr.error('Please make a valid selection');
      return false;
    }
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
      loader: true
    });
    if (!this.state.image) {
      this.props.editBusinessAction(this.props.id, this.state.businessDetails)
        .then((message) => {
          document.getElementsByClassName('modal-backdrop')[0].style.display = "none";
          toastrOption();
          toastr.success(message);
        })
        .catch((message) => {
          toastrOption();
          toastr.error(message);
        });
    } else {
      this.props.imageUploadAction(this.state.image)
        .then(() => {
          this.setState({
            businessDetails: {
              ...this.state.businessDetails,
              image: this.props.imageUrl
            }
          });
          this.props.editBusinessAction(
            this.props.id,
            this.state.businessDetails
          )
            .then((message) => {
              document.getElementsByClassName('modal-backdrop')[0].style.display = "none";
              toastrOption();
              toastr.success(message);
            })
            .catch((message) => {
              toastrOption();
              toastr.error(message);
            });
        });
    }
  }


  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    const { businessDetails, loader, imageUrl } = this.state;
    const { onChange, onSubmit, imageUpload } = this;
    return (
      <div className="modal"
        id="editModal"
        tabIndex="-1" role="dialog"
        aria-labelledby="exampleModalVerticalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-lg" id="editModal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title"
                id="exampleModalVerticalLabel">Edit Business Profile</h3>
              <button type="button" className="close"
                data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="panel-body">
                <form
                  action=""
                  method=""
                  role="form"
                  onSubmit={onSubmit}>
                  <div className="form-group">
                    <label
                      className="col-lg-3 col-form-label form-control-label">
                      <strong>Business Name:</strong>
                    </label>
                    <div className="input-group">
                      <span className="input-group-addon" />
                      <input type="text"
                        name="name"
                        onChange={onChange}
                        defaultValue={businessDetails.name}
                        placeholder="Business Name"
                        className="form-control"
                        autoFocus="autofocus"
                        required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      className="col-lg-3 col-form-label form-control-label">
                      <strong>Business Location:</strong>
                    </label>
                    <div className="input-group">
                      <span className="input-group-addon" />
                      <select type="select"
                        name="location"
                        onChange={onChange}
                        defaultValue={businessDetails.location}
                        placeholder="category"
                        className="form-control"
                        required>
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
                    <label
                      className="col-lg-3 col-form-label form-control-label">
                      <strong>Business Category:</strong>
                    </label>
                    <div className="input-group">
                      <span className="input-group-addon" />
                      <select type="select"
                        name="categoryId"
                        onChange={onChange}
                        defaultValue={businessDetails.categoryId}
                        placeholder="category"
                        className="form-control"
                        required>
                        {this.props.categories.map((editCategory) =>
                          (<option key={editCategory.id}
                            value={editCategory.id}
                            id={`${editCategory.category}`}>
                            {editCategory.category}
                          </option>))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      className="col-lg-3 col-form-label form-control-label">
                      <strong>Picture:</strong>
                    </label>
                    <div className="input-group">
                      <span className="input-group-addon" />
                      <input type="file"
                        name="image"
                        onChange={imageUpload}
                        accept=".jpg, .png, .jpeg"
                        className="form-control-file"
                        id="exampleFormControlFile1"/>
                      {
                        loader ?
                          <i className="fa fa-circle-o-notch fa-spin" /> :
                          null
                      }
                    </div>
                  </div>
                  <div>
                    {
                      imageUrl ?
                        <img alt="User Pic" src={imageUrl}
                          className="img-fluid mb-2 mt-2"/> :
                        <img alt="User Pic"
                          src={!businessDetails.image ?
                            "/images/placeholder.png" :
                            `http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/c_fill,h_300,w_800/${businessDetails.image}`}
                          className="img-fluid mb-2 mt-2"/>
                    }
                  </div>
                  <div className="form-group">
                    <label
                      className="col-lg-3 col-form-label form-control-label">
                      <strong>Business Details:</strong>
                    </label>
                    <div className="input-group">
                      <span className="input-group-addon" />
                      <textarea
                        name="details"
                        onChange={onChange}
                        defaultValue={businessDetails.details}
                        placeholder="Business-Details"
                        rows="10" className="form-control"
                        type="text"
                        required />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button"
                      id="closeModal"
                      className="btn btn-secondary"
                      data-dismiss="modal">Close
                    </button>
                    <button type="submit"
                      id="modal-button"
                      className="btn btn-primary">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditModal.propTypes = {
  editBusinessAction: PropTypes.func.isRequired,
  imageUploadAction: PropTypes.func.isRequired,
  business: PropTypes.object,
  imageUrl: PropTypes.string,
  categories: PropTypes.array,
  locations: PropTypes.array,
  id: PropTypes.number
};
const mapStateToProps = (state) => ({
  business: state.BusinessReducer.business,
  categories: state.BusinessReducer.categories,
  imageUrl: state.BusinessReducer.imageUrl
});

export default connect(
  mapStateToProps,
  {
    editBusinessAction,
    imageUploadAction
  }
)(EditModal);
