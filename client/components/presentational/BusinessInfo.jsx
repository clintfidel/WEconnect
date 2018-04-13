import React from 'react';
import PropTypes from 'prop-types';
import Review from '../presentational/Review';

const BusinessInfo = ({
  userId, name, details, location,
  category, deleteHandler, userAuth
}) => (
  <div>
    <div className="business-image">
      <img src="/business-background-1.png" alt="business"/>
      <div className="text-center">
        <span>{name}</span>
      </div>
    </div>
    <div className="row grouped-buttons">
      <div className="bus-info">
        <span>
          <a href="#" className="active" id="my-Info">Business-Info</a>
        </span>
      </div>
      <div className="bus-reviews">
        <span>
          <a href="#reviews" className="active">Reviews</a>
        </span>
      </div>
    </div>
    <div className="content-display">
      <div className="bus-info-details" style={{ display: "block" }}>
        <h3>Business-Info</h3>
        <div className="business-content">
          <h5>
            <span>Name:</span>{name}</h5>
          <h5>
            <span>Location:</span>{location}</h5>
          <h5>
            <span>Category:</span>{category}</h5>

          <h5>
            <span>Details</span>:
            <p>
              {details}
            </p>
          </h5>
        </div>
        {userAuth === userId ?
          <div className="Icon-Images">
            <img src="/edit-icon-2375785_1280.png"
              alt="edit Icon" data-toggle="modal"
              data-target="#exampleModalVertical"
              title="edit business"/>
            <img src="/delete-icon.png"
              alt="delete Icon"
              title="delete business"
              onClick={deleteHandler}/>
          </div> : ''

        }
        <hr/>
        <div className="modal"
          id="exampleModalVertical"
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
                  <form action="">
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <input type="text" name="Business-Name"
                          placeholder="Business Name"
                          className="form-control"
                          autoFocus="autofocus" required/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <input type="text"
                          name="Location"
                          placeholder="Business Location"
                          className="form-control"
                          required/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" />
                        <select type="select"
                          name="category"
                          placeholder="category"
                          className="form-control"
                          required>
                          <option value="fashion">select category</option>
                          <option value="fashion">fashion</option>
                          <option value="football">football</option>
                          <option value="entertainment">entertainment</option>
                          <option value="technology">technology</option>
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
                        <textarea name="Business-Details"
                          placeholder="Business-Details"
                          rows="10" className="form-control"
                          type="text" required />
                      </div>
                    </div>
                  </form>
                  <div className="modal-footer">
                    <button type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal">Close</button>
                    <button type=""
                      className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Review />
    </div>
  </div>
);


BusinessInfo.propTypes = {
  name: PropTypes.string,
  details: PropTypes.string,
  location: PropTypes.string,
  category: PropTypes.string,
  deleteHandler: PropTypes.func,
  userAuth: PropTypes.number,
  userId: PropTypes.number
};

export default BusinessInfo;
