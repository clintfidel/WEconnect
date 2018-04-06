import React from 'react';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';

const Businesses = ({ name, details }) => (
  <div>
    <a href="../Html/view-business.html">
      <section className="row cataloge">
        <div className="image">  {/*eslint-disable-line*/}
          {/*<img src="/bus-image.jpg" alt="businessImage"/>*/}
        </div>
        <div className="text">
          <h2>{name}</h2>
          <TextTruncate line={3} truncateText="…" text={details} />
        </div>
      </section>
    </a>
    <hr/>
  </div>
);

Businesses.propTypes = {
  name: PropTypes.string,
  details: PropTypes.string
};

export default Businesses;
