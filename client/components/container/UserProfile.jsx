import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../presentational/common/NavBar';
import Footer from '../presentational/common/Footer';
import ViewUserProfile from '../presentational/ViewUserProfile';
import { userProfileAction } from '../../actions/AuthAction';
import { getAllUserBusinessAction } from '../../actions/BusinessAction';


/**
 * @class ViewBusiness
 *
 * @classdesc User Profile
 *
 */
class UserProfile extends Component {
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
      loader: false
    };
  }

  /**
   * @description - displays user profile
   *
   * @return {void} no return or void
   */
  componentDidMount() {
    this.setState({
      loader: true
    });
    this.props.getAllUserBusinessAction(1);
    this.props.userProfileAction()
      .then(() => {
        this.setState({
          loader: false
        });
      });
  }

  /**
   * @description displayUserProfile - display user profile
   *
   * @return {object} returns an object
   *
   */
  displayUserProfile() {
    const {
      fullname, email, username, image
    } = this.props.userProfile;
    return (
      <ViewUserProfile
        fullname={fullname}
        email={email}
        username={username}
        noOfBusiness={this.props.count}
        image={image}
      />
    );
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
        <NavBar/>
        <div>
          <div className="container user-profile">
            <div className="profile-container">
              <h2 className="panel-title">My profile</h2>
              <hr/>
              <div>
                {this.displayUserProfile()}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

UserProfile.propTypes = {
  userProfileAction: PropTypes.func.isRequired,
  getAllUserBusinessAction: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
  fullname: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  count: PropTypes.number,
  image: PropTypes.string
};
const mapStateToProps = (state) => ({
  userProfile: state.AuthReducer.user,
  count: state.BusinessReducer.count,
  image: state.AuthReducer.imageUrl
});

export default connect(
  mapStateToProps,
  { userProfileAction, getAllUserBusinessAction }
)(UserProfile);

