import React from 'react';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';

const Businesses = ({
  name, details, id, image, views, owner,
  averageRating
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
        <div>
          <h5>Average Rating:</h5>
          <div className="business-stars">
            <ReactStars
              count={5}
              size={13}
              edit={false}
              value={Number(averageRating)}
            />
            <p className="rating-num"> {averageRating} </p>
          </div>
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
  averageRating: PropTypes.number,
};

export default Businesses;
