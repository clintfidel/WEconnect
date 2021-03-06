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
export class Signup extends Component {
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
      redirectUser: false,
      disableBtn: false,
      loader: false
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @description - redirect registered user to all-budiness page
   *
   * @return {void} no return or void
   */
  componentWillMount() {
    if (localStorage.token) {
      this.props.history.push('/all-business');
    }
  }
  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onChange(event) {
    const passKey = $('#signup-password').val();
    this.setState({
      [event.target.name]: event.target.value
    });
    switch (event.target.name) {
    case 'passwordConfirm':
      if (event.target.value !== passKey) {
        this.setState({
          disableBtn: true
        });
        return false;
      } else {
        this.setState({
          disableBtn: false,
        });
      }
    }
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
    const passKey = $('#signup-password').val();
    switch (name) {
    case 'fullname':
      if (value.length < 5 || !value) {
        this.setState({
          fullnameError: 'Username should be more than 5 characters',
          disableBtn: true
        });
        return false;
      } else {
        this.setState({
          fullnameError: '',
          disableBtn: false
        });
        return true;
      }
      break;
    case 'username':
      if (value.length < 5 || !value) {
        this.setState({
          usernameError: 'Username should be more than 5 characters long',
          disableBtn: true
        });
        return false;
      } else {
        this.setState({
          usernameError: '',
          disableBtn: false
        });
        return true;
      }
      break;
    case 'password':
      if (value.length < 8 || !value) {
        this.setState({
          passwordError: 'Password should be more than 8 characters long',
          disableBtn: true
        });
        return false;
      } else {
        this.setState({
          passwordError: '',
          disableBtn: false
        });
        return true;
      }
      break;
    case 'passwordConfirm':
      if (value !== passKey) {
        this.setState({
          passwordConfirmError: 'password do not match!'
        });
        return false;
      } else {
        this.setState({
          passwordConfirmError: ''
        });
      }
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
    this.setState({
      disableBtn: true,
      loader: true
    });
    this.props.registerAction(this.state)
      .then((message) => {
        toastrOption();
        toastr.success(message);
        setTimeout(() => {
          this.setState({ redirectUser: true });
        }, 3000);
      })
      .catch(message => {
        this.setState({
          disableBtn: false,
          loader: false
        });
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
    const {
      onChange, onSubmit, onFocus, onBlur
    } = this;
    const {
      disableBtn,
      loader,
      redirectUser,
      fullnameError,
      usernameError,
      passwordError,
      passwordConfirmError
    } = this.state;
    return (
      redirectUser ?
        <Redirect to= "/all-business"/> :
        <div>
          <div className="login-body">
            <main className="login-container">
              <div className="my-logo">
                <Link to="/">
                  <img src="/images/logo.png" alt=" WEconnect" />
                </Link>
              </div>
              <div className="input-box">
                <form
                  className="signup-form"
                  action="#"
                  method="post"
                  role="form"
                  onSubmit={onSubmit}>

                  <input type="text"
                    id="signup-fullName"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    name="fullname"
                    placeholder="Fullname"
                    required />
                  <div style={{ color: 'red' }}>
                    {fullnameError}
                  </div>
                  <input type="text"
                    id="signup-username"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    name="username"
                    placeholder="username"
                    required />
                  <div style={{ color: 'red' }}>
                    {usernameError}
                  </div>
                  <input type="email"
                    id="signup-email"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    name="email"
                    placeholder="email"
                    required />
                  <input type="password"
                    id="signup-password"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    name="password"
                    placeholder="password"
                    required />
                  <div style={{ color: 'red' }}>
                    {passwordError}
                  </div>
                  <input type="password"
                    id="signup-cpassword"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    name="passwordConfirm"
                    placeholder="connfirm-password"
                    required />
                  <div style={{ color: 'red' }}>
                    {passwordConfirmError}
                  </div>
                  <button
                    className="btn"
                    type="submit"
                    name="submit"
                    disabled={disableBtn}
                  >
                    {loader ? <i className="fa fa-circle-o-notch fa-spin" /> :
                      'Sign Up'}

                  </button>
                </form>
                <div className="create-account">
                  <p>
                    <Link to="/login"> Registered Already? Log In
                    <span> Here</span>
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
