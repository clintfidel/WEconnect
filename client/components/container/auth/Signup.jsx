import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import checkUserInput from '../../../utils/validation';
import toastrOption from '../../../utils/toastrOption';
import { registerAction } from '../../../actions/AuthAction';


/**
 * @class Signup
 *
 * @classdesc registers user
 *
 */
class Signup extends Component {
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
      username: '',
      fullname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      usernameError: '',
      fullnameError: '',
      passwordError: '',
      passwordConfirmError: '',
      redirectUser: false
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description - handles the onFocus event
   *
   * @param  {object} event  for the content field
   *
   * @return {void}
   */
  onFocus(event) {
    const { name } = event.target;
    switch (name) {
    case 'fullname':
      this.setState({ fullnameError: '' });
      break;
    case 'username':
      this.setState({ usernameError: '' });
      break;
    case 'email':
      this.setState({ emailError: '' });
      break;
    case 'password':
      this.setState({ passwordError: '' });
      break;
    case 'passwordConfirm':
      this.setState({ passwordConfirmError: '' });
      break;
    }
  }

  /**
   * @description - handles the onBlur event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onBlur(event) {
    const { name } = event.target,
      { value } = event.target;
    switch (name) {
    case 'fullname':
      if (value.length < 5 || !value) {
        this.setState({
          fullnameError: 'Username should be more than 5 characters'
        });
        return false;
      }
      return true;
      break;
    case 'username':
      if (value.length < 5 || !value) {
        this.setState({
          usernameError: 'Username should be more than 5 characters long'
        });
        return false;
      }
      return true;
      break;
    case 'password':
      if (value.length < 5 || !value) {
        this.setState({
          passwordError: 'Password should be more than 8 characters long'
        });
        return false;
      }
      return true;
      break;
    case 'passwordConfirm':
      if (value !== this.state.password) {
        this.setState({ passwordConfirmError: 'password do not match!' });
        return false;
      }
      return true;
      break;
    }
  }

  /**
   * @description - handles the onSubmit event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const { username, fullname, password } = this.state;
    if (checkUserInput(username, fullname, password)) {
      toastrOption();
      return toastr.error('Invalid Input');
    }
    this.props.registerAction(this.state)
      .then((message) => {
        toastrOption();
        toastr.success(message);
        setTimeout(() => {
          this.setState({ redirectUser: true });
        }, 3000);
      })
      .catch(message => {
        toastrOption();
        toastr.error(message);
      });
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    if (localStorage.token) {
      this.props.history.push('/all-business');
    }
    return (
      this.state.redirectUser ?
        <Redirect to= "/all-business"/> :
        <div>
          <div className="login-body">
            <main className="login-container">
              <div className="my-logo">
                <Link to="/">
                  <img src="/logo.png" alt=" WEconnect" />
                </Link>
              </div>
              <div className="input-box">
                <form
                  action="#"
                  method="post"
                  role="form"
                  onSubmit={this.onSubmit}>

                  <input type="text"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    name="fullname"
                    placeholder="Fullname"
                    required />
                  <div style={{ color: 'red' }}>
                    {this.state.fullnameError}
                  </div>
                  <input type="text"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    name="username"
                    placeholder="username"
                    required />
                  <div style={{ color: 'red' }}>
                    {this.state.usernameError}
                  </div>
                  <input type="email"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    name="email"
                    placeholder="email"
                    required />
                  <input type="password"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    name="password"
                    placeholder="password"
                    required />
                  <div style={{ color: 'red' }}>
                    {this.state.passwordError}
                  </div>
                  <input type="password"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    name="passwordConfirm"
                    placeholder="connfirm-password"
                    required />
                  <div style={{ color: 'red' }}>
                    {this.state.passwordConfirmError}
                  </div>
                  <button
                    type="submit"
                    name="submit"
                  >
                  Sign Up

                  </button>
                </form>
                <div className="create-account">
                  <p>
                    <Link to="/login"> Registered Already? Log In
                    <span>Here</span>
                    </Link>
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
    );
  }
}

Signup.propTypes = {
  registerAction: PropTypes.func.isRequired,
  history: PropTypes.object

};

export default connect(null, { registerAction })(Signup);
