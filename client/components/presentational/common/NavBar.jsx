import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../../actions/AuthAction';

/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
class NavBar extends Component {
  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    return (
      <ul className="nav justify-content-end business-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <img src="/images/wc-logo.png"
              alt="logo" style={{ width: "150px" }}/>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register-business">
     Register-business
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/all-business">
      Catalogue
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/userbusiness">
      My-business
          </Link>
        </li>
        <li className="nav-item">
          <div
            className="dropdown">
            <button className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">Profile
            </button>
            <div className="dropdown-menu">
              <Link
                className="dropdown-item"
                to="/profile">View profile
              </Link>
              <div className="dropdown-divider" />
              <Link
                onClick={this.props.logoutAction}
                className="nav-link" to="/">Log out
              </Link>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}
NavBar.propTypes = {
  logoutAction: PropTypes.func.isRequired

};

export default connect(null, { logoutAction })(NavBar);
