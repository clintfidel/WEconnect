import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size }) => (
  <div>
    <img src="/images/log.gif" alt="loader"
      style= {{
        width: size,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        margin: "auto"
      }}/>
  </div>
);

Loader.propTypes = {
  size: PropTypes.string
};

export default Loader;
