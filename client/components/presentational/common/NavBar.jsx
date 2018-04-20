import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
const NavBar = () =>

  (
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
                Calogue
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../Html/index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
export default NavBar;
