import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastrOption from '../../utils/toastrOption';
import {
  editUserProfileAction,
  imageUploadAction
} from '../../actions/AuthAction';

/**
 * @class ViewBusiness
 *
 * @classdesc User Profile
 *
 */
class EditUserProfile extends Component {
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
      userTemplate: this.props.userDetailStorage,
      image: null,
      imageUrl: null

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.imageUpload = this.imageUpload.bind(this);
  }

  /**
   * @description - Update user details in state with props
   *
   * @param {object} nextProps
   *
   * @return {void} no return or void
   *
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.id) {
      this.setState({
        userTemplate: nextProps.user
      });
    }
  }

  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onChange(event) {
    const { userTemplate } = this.state;
    userTemplate[event.target.name] = event.target.value;
    this.setState({
      userTemplate: userTemplate
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
    if (!this.state.image) {
      this.props.editUserProfileAction(this.state.userTemplate)
        .then((message) => {
          $(".modal-backdrop").remove();
          $('.modal').hide();
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
            userTemplate: {
              ...this.state.userTemplate,
              image: this.props.imageUrl
            }
          });
          this.props.editUserProfileAction(this.state.userTemplate)
            .then((message) => {
              $(".modal-backdrop").remove();
              $('.modal').hide();
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
   * @description displayUserProfile - display user profile
   *
   * @return {object} returns an object
   *
   */
  render() {
    return (
      <div>
        <div className="modal"
          id="editModal"
          tabIndex="-1" role="dialog"
          aria-labelledby="exampleModalVerticalLabel"
          aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title"
                  id="exampleModalVerticalLabel">Edit User Profile</h3>
                <button type="button" className="close"
                  data-dismiss="modal" aria-label="Closen">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="panel-body">
                  <form
                    action="#"
                    method="post"
                    role="form"
                    onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label
                        className="col-lg-3 col-form-label form-control-label">
                        <strong>Full Name:</strong>
                      </label>
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <input type="text"
                          name="fullname"
                          onChange={this.onChange}
                          value={this.state.userTemplate.fullname}
                          placeholder="fullname"
                          className="form-control"
                          autoFocus="autofocus"
                          required/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        className="col-lg-3 col-form-label form-control-label">
                        <strong>Username:</strong>
                      </label>
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <input type="text"
                          name="username"
                          onChange={this.onChange}
                          value={this.state.userTemplate.username}
                          placeholder="userame"
                          className="form-control"
                          autoFocus="autofocus"
                          required/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        className="col-lg-3 col-form-label form-control-label">
                        <strong>Email:</strong>
                      </label>
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <input type="email"
                          name="email"
                          onChange={this.onChange}
                          value={this.state.userTemplate.email}
                          placeholder="email"
                          className="form-control"
                          autoFocus="autofocus"
                          required/>
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
                          onChange={this.imageUpload}
                          accept=".jpg, .png, .jpeg"
                          className="form-control-file"
                          id="exampleFormControlFile1"/>
                      </div>
                    </div>
                    <div>
                      {
                        this.state.imageUrl ?
                          <img alt="User Pic" src={this.state.imageUrl}
                            className="img-fluid mb-2 mt-2"/> :
                          <img alt="User Pic"
                            src=
                              {`http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/c_fill,h_300,w_300/${this.state.userTemplate.image}`}
                            className="img-fluid mb-2 mt-2"/>
                      }
                    </div>
                    <div className="modal-footer">
                      <button type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal">Close</button>
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
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  editUserProfileAction: PropTypes.func.isRequired,
  imageUploadAction: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  user: PropTypes.object,
  userDetailStorage: PropTypes.object
};

const mapStateToProps = (state) => {
  const userDetailsTemplate = {
    fullname: '',
    email: '',
    username: '',
    id: '',
    image: ''
  };
  return {
    user: state.AuthReducer.user,
    userDetailStorage: userDetailsTemplate,
    imageUrl: state.AuthReducer.imageUrl
  };
};

export default connect(
  mapStateToProps,
  { editUserProfileAction, imageUploadAction }
)(EditUserProfile);
