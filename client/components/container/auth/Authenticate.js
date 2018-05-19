import React, { Component } from 'react';
import Jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutAction } from '../../../actions/AuthAction';
/**
 * @class AuthenticateUser
 *
 * @param  {object} PassedComponent the store state
 *
 * @classdesc authenticate user component
 *
 */
export default function Authenticate(PassedComponent) {
/**
 * @class ProtectRoutes
 *
 * @classdesc Protect all Routes
 *
 */
  class AuthenticateUser extends Component {
    /**
   * constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   *
   */
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: true
      };
    }

    /**
   * @description - protect routes
   *
   * @return {void} no return or void
   */
    componentWillMount() {
      const key = process.env.SECRET_KEY;
      const token = localStorage.getItem('token');
      if (token) {
        Jwt.verify(token, key, (error) => {
          if (error) {
            this.setState({
              isAuthenticated: false
            }, () =>
              this.props.logoutAction());
            this.props.history.push('/');
          }
        });
      }

      if (!token) {
        this.setState({
          isAuthenticated: false
        }, () =>
          this.props.logoutAction());
        this.props.history.push('/');
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
          {this.state.isAuthenticated && <PassedComponent {...this.props} />}
        </div>

      );
    }
  }
  AuthenticateUser.propTypes = {
    logoutAction: PropTypes.func.isRequired,
    history: PropTypes.object
  };

  return connect(null, { logoutAction })(AuthenticateUser);
}
