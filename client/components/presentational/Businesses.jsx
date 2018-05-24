import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';

const Businesses = ({
  name, details, id, image, views, owner
}) => (
  <div className="container">
    <div className="row card-wrapper">
      <div className="col-sm-5 image">
        {
          !image ?
            <img alt="User Pic"
              src="/images/placeholder.png"
              className="img-fluid business-image"/> :
            <img alt="User Pic"
              src={`http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/${image}`}
              className="img-fluid business-image"/>
        }
      </div>
      <div className="col-sm-7 text">
        <h3 className="ellipse">{name}</h3>
        <TextTruncate line={3} truncateText="…" text={details}
          className="word-wrap"/>
        <div className="button-container">
          <Link to={`/view-business/${id}`}
            className="view-button">view more</Link>
        </div>
        <hr/>
        <div className="row views">
          <div className="col-sm-5">
            <i className="far fa-eye" style={{ color: "#136c8b" }}>: {views}</i>
          </div>
          <div className="col-sm-5">
            <p>Business-owner: {owner}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Businesses.propTypes = {
  name: PropTypes.string,
  details: PropTypes.string,
  id: PropTypes.number,
  image: PropTypes.string,
  views: PropTypes.number,
  owner: PropTypes.string,
};

export default Businesses;
