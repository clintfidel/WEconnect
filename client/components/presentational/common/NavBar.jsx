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
      <div>
        <nav className="navbar navbar-expand-md ">
          <div className="link-container">
            <div className="nav navbar-brand">
              <Link to="/">
                <img src="/wc-logo.png" alt="" />
              </Link>
            </div>
            <div className="nav-list" id="navbarNavDropdown">
              <ul className="nav navbar-pull-right">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home
                  <span className="sr-only">(current)</span>
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
                  <Link
                    onClick={this.props.logoutAction}
                    className="nav-link" to="/">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
NavBar.propTypes = {
  logoutAction: PropTypes.func.isRequired

};

export default connect(null, { logoutAction })(NavBar);
