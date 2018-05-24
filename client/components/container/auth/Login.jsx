import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../../../actions/AuthAction';
import toastrOption from '../../../utils/toastrOption';

/**
 * @class Login
 *
 * @classdesc Logs user in
 *
 */
class Login extends Component {
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
      password: '',
      redirectUser: false,
      loader: false,
      disableBtn: false
    };

    this.onChange = this.onChange.bind(this);
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
   * @description - handles the onChange event
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
   * @description - handles the onSubmit event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      disableBtn: true,
      loader: true
    });
    this.props.loginAction(this.state)
      .then(() => {
        setTimeout(() => {
          this.setState({ redirectUser: true });
          toastrOption();
          toastr.success('Welcome Back!');
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
    return (
      this.state.redirectUser ?
        <Redirect to= "/all-business" /> :
        <div>
          <div className="login-body">
            <main className="login-container">
              <div className="my-logo">
                <Link to="/">
                  <img src="/images/logo.png" alt=" WEconnect"/>
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
                    name= "username"
                    placeholder="username/email"
                    required/>
                  <input type="password"
                    onChange={this.onChange}
                    name= "password"
                    placeholder="password"
                    required/>
                  <button
                    className="btn"
                    type="submit"
                    name="submit"
                    disabled={this.state.disableBtn}
                  >
                    {this.state.loader ? <i className="fa fa-circle-o-notch fa-spin" /> : 'Login'}
                  </button>
                </form>
                <div className="create-account">
                  <p>
                    <Link to="/signup">Don't have an account? create one
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

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default connect(null, { loginAction })(Login);
