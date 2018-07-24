import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

/**
 * @class ProtectRoutes
 *
 * @classdesc Protect all Routes
 *
 */
class HomePage extends PureComponent {
  /**
   * @description - protect routes
   *
   * @return {void} no return or void
   */
  componentWillMount() {
    if (localStorage.token) {
      this.props.history.push('/all-business');
    }
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
        <main className="landing-page-container">
          <section className="our-brand">
            <nav className="nav-header">
              <div className="brand-logo">
                <img src="/images/logo-with-background.png" alt="WEconnect"/>
              </div>
              <ul className="user">
                <li>
                  <Link to="/signup">
                    <button type="submit" className="signup">Sign Up</button>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <button type="submit" className="login">Login</button>
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
          <section className="about-weconnect">
            <div className="wrap">
              <h2>Business made easy!</h2>
              <p>
            WeConnect provides a platform that brings
            businesses and individuals together.
            This platform creates awareness for businesses
            and gives the users the ability to write reviews
            about the businesses they have interacted with.
            This is also an opportunity to get insight
            as to starting up a business.
            Explore this amazing business relationship App and get
            experienced in the experience!
              </p>
            </div>
          </section>
          <section className="footer">
            <div className="social">
              <a href="#">
                <img src="/images/facebook-icon.png" alt=""/>
              </a>
              <a href="#">
                <img src="/images/instagram-icon.png" alt=""/>
              </a>
              <a href="#">
                <img src="/images/twitter-icon.png" alt=""/>
              </a>
              <a href="#">
                <img src="/images/google-icon.png" alt=""/>
              </a>
            </div>
            <div className="contact-me">
              <p>
                WEconnect is here to provide you with more business information,
                 answer any business related question and also create an
                effective work around for your business idea.
                 contact us via icons.
              </p>
            </div>
            <div className="footer-text">
              <p>
              Policies: Terms of use
              </p>
              <p>
              Privacy
              </p>
              <p>
                Authentic Items
              </p>
              <hr/>
              <p>
                Copyright &copy; 2018 WeConnect.herokuapp.com.
                All Rights reserved. Designed by clintfidel
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  }
}


export default HomePage;
