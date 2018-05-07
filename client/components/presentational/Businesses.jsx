import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';

const Businesses = ({
  name, details, id, image
}) => (
  <div>
    <div className="row cataloge">
      <div className="col-sm-5">
        {
          !image ?
            <img alt="User Pic"
              src="/images/placeholder.png"
              className="img-fluid"/> :
            <img alt="User Pic"
              src={`http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/c_fill,h_281,w_465/${image}`}
              className="img-fluid"/>
        }
      </div>
      <div className="col-sm-7 text">
        <h2>{name}</h2>
        <TextTruncate line={4} truncateText="…" text={details}
          className="details"/>
        <div className="button-container">
          <Link to={`/view-business/${id}`} className="view-button">view more</Link>
        </div>

      </div>
    </div>
    <hr/>
  </div>
);

Businesses.propTypes = {
  name: PropTypes.string,
  details: PropTypes.string,
  id: PropTypes.number,
  image: PropTypes.string
};

export default Businesses;
