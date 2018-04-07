import React from 'react';

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
            <a href="http://">
              <img src="/wc-logo.png" alt="" />
            </a>
          </div>
          <div className="nav-list" id="navbarNavDropdown">
            <ul className="nav navbar-pull-right">
              <li className="nav-item active">
                <a className="nav-link" href="../Html/index.html">Home
                <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../Html/business-page.html">
                  Register-business
                </a>
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
