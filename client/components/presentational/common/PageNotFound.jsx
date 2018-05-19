import React from 'react';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

const PageNotFound = () => (
  <div>
    <NavBar />
    <div className="page-not-found">
      <div> <img src="/images/404.png" /> </div> <br/>
      <h1>Page Not Found!!</h1>
    </div>
    <Footer />
  </div>
);

export default PageNotFound;
