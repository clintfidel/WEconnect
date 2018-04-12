import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';

const Businesses = ({ name, details, id }) => (
  <div>
    <Link to={`/view-business/${id}`}>
      <section className="row cataloge">
        <div className="image">  {/*eslint-disable-line*/}
          {/*<img src="/bus-image.jpg" alt="businessImage"/>*/}
        </div>
        <div className="text">
          <h2>{name}</h2>
          <TextTruncate line={3} truncateText="…" text={details} />
        </div>
      </section>
    </Link>
    <hr/>
  </div>
);

Businesses.propTypes = {
  name: PropTypes.string,
  details: PropTypes.string,
  id: PropTypes.number
};

export default Businesses;
