import React from 'react';
import PropTypes from 'prop-types';
import EditUserModal from '../container/EditUserProfile';

const ViewUserProfile = ({
  fullname, email, username, noOfBusiness, image
}) => (
  <div>
    <div className="panel-body">
      <div className="row">
        <div className="col-md-6 col-lg-9 " align="center">
          {
            !image ?
              <img alt="User Pic"
                src="http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png"
                className="img-circle img-responsive user-img"/> :
              <img alt="User Pic"
                src={`http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/c_fill,h_300,w_300/${image}`}
                className="img-circle img-responsive user-img"/>
          }

        </div>
        <div className=" col-md-6 col-lg-9 ">
          <table className="table table-user-information">
            <tbody>
              <tr>
                <td className="data-key">Fullname:</td>
                <td className="key-value">{fullname}</td>
              </tr>
              <tr>
                <td className="data-key">Username:</td>
                <td className="key-value">{username}</td>
              </tr>
              <tr>
                <td className="data-key">Email</td>
                <td className="key-value">
                  <a href={`mailto:${email}`}>{email}
                  </a>
                </td>
              </tr>
              <tr>
                <td className="data-key">No of Business:</td>
                <td className="key-value">{noOfBusiness}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="panel-footer">
      <span>
        <button className="btn btn-sm btn-info" data-toggle="modal"
          data-target="#editModal">
          <i className="glyphicon glyphicon-edit" />
         Edit Profile
        </button>
        <EditUserModal />
      </span>
    </div>
  </div>

);

ViewUserProfile.propTypes = {
  fullname: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  noOfBusiness: PropTypes.number,
  image: PropTypes.string
};

export default ViewUserProfile;

