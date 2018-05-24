import React from 'react';
import PropTypes from 'prop-types';
import EditUserProfile from '../container/EditUserProfile';

const ViewUserProfile = ({
  fullname, email, username, noOfBusiness, image
}) => (
  <div>
    <div className="row">
      <div className="col-sm-4">
        <div align="center">
          {
            !image ?
              <img alt="User Pic"
                src="http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png"
                className="user-img"/> :
              <img alt="User Pic"
                src={`http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/c_fill,h_300,w_300/${image}`}
                className="user-img"/>
          }

        </div>
      </div>
      <div className="col-sm-8">
        <table className="table">
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
        <button className="btn btn-sm btn-info" data-toggle="modal"
          data-target="#editModal">
              Edit Profile
        </button>
        <EditUserProfile />
      </div>
    </div>
    {/* </div> */}
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

