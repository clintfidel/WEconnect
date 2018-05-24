import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import toastrOption from '../../../utils/toastrOption';
import { logoutAction } from '../../../actions/AuthAction';

/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
export class NavBar extends Component {
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
    this.logout = this.logout.bind(this);
  }

  /**
   * @description - handles the logout event
   *
   * @param  {object} event -the event for the content field
   *
   * @return {void}
   */
  logout() {
    this.props.logoutAction();
  }
  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light business-nav">
        <Link className="nav-link" to="/all-business">
          <img src="/images/wc-logo.png"
            alt="logo" style={{ width: "150px" }}/>
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-collapse collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link link" to="/register-business">
                Register-business
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link" to="/all-business">
                Catalogue
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link" to="/userbusiness">
                My-business
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle link"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Profile
              </a>
              <div className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink">
                <Link
                  className="nav-link"
                  to="/myprofile">
                  View profile
                </Link>
                <Link
                  onClick={this.logout}
                  to="/"
                  className="nav-link">Log out
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
NavBar.propTypes = {
  logoutAction: PropTypes.func.isRequired

};

export default connect(null, { logoutAction })(NavBar);

