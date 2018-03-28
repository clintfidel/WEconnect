import React, { Component } from 'react'

class HomePage extends Component {
  render () {
    return (
      <div>
      <main className="landing-page-container">
      <section className="our-brand">
        <nav className="nav-header">
          <div className="brand-logo">
            <img src="/logo-with-background.png" alt="WEconnect"/>
          </div>
          <ul className="user">
            <li>
              <a href="">
                <button type="submit">Sign Up</button>
              </a>
            </li>
            <li>
              <a href="">
                <button type="submit">Login</button>
              </a>
            </li>
            <li>
              <a href="">
                <button type="submit">Catalogue</button>
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <section className="about-weconnect">
        <div className="wrap">
          <h2>Business made easy!</h2>
          <p>
            WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses
            and gives the users the ability to write reviews about the businesses they have interacted with. This is also an
            opportunity to get insight as to starting up a business. Explore this amazing business relationship App and get
            experienced in the experience!
          </p>
        </div>
      </section>
      <section className="footer">
          <div className="social">
              <a href="#">
                <img src="/facebook-icon.png" alt=""/>
              </a>
              <a href="#">
                <img src="/instagram-icon.png" alt=""/>
              </a>
              <a href="#">
                <img src="/twitter-icon.png" alt=""/>
              </a>
              <a href="#">
                <img src="/google-icon.png" alt=""/>
              </a>
            </div>
        <div className="contact-me">
            <p>
                WEconnect is here to provide you with more business information, answer any business related question and also create an
                effective work around for your business idea. contact us via icons.
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
                Copyright &copy; WeConnect.herokuapp.com. All Rights reserved. Designed by clintfidel
            </p>
          </div>
      </section>
    </main>
      </div>
    )
  }
}

export default HomePage
