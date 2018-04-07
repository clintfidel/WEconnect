import React from 'react';
// import PropTypes from 'prop-types';

/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
// class SearchBuiness extends Component {
//   /**
//    * constructor - contains the constructor
//    *
//    * @param  {object} props the properties of the class component
//    *
//    * @return {void} no return or void
//    *
//    */
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchStatus: false,
//       searchTerm: ''
//     };
//   }

const SearchBuiness = () => (
  <div>
    <div className="container" id="contain-form">
      <div className="row search">
        <input type="text" placeholder="search business by name...." />
        <select className="custom-select" name="location" id="">
          <option value="Select From...">
                Select From...
          </option>
          <option value="Footbal">
                Abuja
          </option>
          <option value="Technology">
                Lagos
          </option>
          <option value="Entertainment">
                Akwa Ibom
          </option>
        </select>
        <select className="custom-select" name="category" id="">
          <option value="Select From...">
                Select From...
          </option>
          <option value="Footbal">
                Football
          </option>
          <option value="Technology">
                Technology
          </option>
          <option value="Entertainment">
                Entertainmentc
          </option>
        </select>
        <button type="button">
              submit
        </button>
      </div>
    </div>
  </div>
);
// }

// SearchBuiness.propTypes = {

// };

export default SearchBuiness;
