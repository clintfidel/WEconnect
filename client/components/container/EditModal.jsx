import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editBusinessAction } from '../../actions/BusinessAction';
import toastrOption from '../../utils/toastrOption';

/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
class EditModal extends Component {
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
    super(props);
    this.state = {
      loader: false,
      redirectUser: false,
      name: this.props.business.name,
      details: this.props.business.details,
      categoryId: this.props.business.categoryId,
      location: this.props.business.location
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.props.editBusinessAction(this.props.id, this.state)
      .then((message) => {
        toastrOption();
        toastr.success(message);
      })
      .catch((message) => {
        toastrOption();
        toastr.error(message);
        console.log(message);
      });
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
        <div className="modal"
          id="editModal"
          tabIndex="-1" role="dialog"
          aria-labelledby="exampleModalVerticalLabel"
          aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
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
                    action="#"
                    method="post"
                    role="form"
                    onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <input type="text"
                          name="name"
                          onChange={this.onChange}
                          defaultValue={this.state.name}
                          placeholder="Business Name"
                          className="form-control"
                          autoFocus="autofocus"
                          required/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <select type="select"
                          name="location"
                          onChange={this.onChange}
                          defaultValue={this.state.location}
                          placeholder="category"
                          className="form-control"
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
                        <select type="select"
                          name="categoryId"
                          onChange={this.onChange}
                          defaultValue={this.state.categoryId}
                          placeholder="category"
                          className="form-control"
                          required>
                          <option>Choose category</option>
                          {this.props.categoryList.map((editCategory) =>
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
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <input type="file"
                          className="form-control-file"
                          id="exampleFormControlFile1"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <textarea
                          name="details"
                          onChange={this.onChange}
                          defaultValue={this.state.details}
                          placeholder="Business-Details"
                          rows="10" className="form-control"
                          type="text"
                          required />
                      </div>
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

EditModal.propTypes = {
  editBusinessAction: PropTypes.func.isRequired,
  business: PropTypes.object,
  categoryList: PropTypes.array,
  locations: PropTypes.array,
  id: PropTypes.number
};
const mapStateToProps = (state) => ({
  business: state.BusinessReducer.business
});

export default connect(
  mapStateToProps,
  {
    editBusinessAction,
  }
)(EditModal);
