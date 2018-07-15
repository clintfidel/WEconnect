import React from 'react';
import expect from 'expect';
import $ from 'jquery';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from '../../../../components/container/auth/Login';
import mockLocalStorage from '../../../mocks/mockLocalStorage';

configure({ adapter: new Adapter() });

window.localStorage = mockLocalStorage.setItem("token", "dek3dcndx.sejhdbsfd");

let props;
const setup = () => {
  props = {
    history: {
      push: jest.fn()
    },
    loginAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<Login {...props} />);
};

describe('Component: Login', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('Login component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).toBe(5);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('input').length).toBe(2);
      expect(wrapper.find('main').length).toBe(1);
      expect(wrapper.find('img').length).toBe(1);
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.find('Link').length).toBe(2);
    });
    it('should call componentWillMount()', () => {
      setup().instance().componentWillMount();
    });
  });

  describe('onChange()', () => {
    it('should set username to state when input values changes', () => {
      const event = { target: { name: 'username', value: '' } };
      const wrapper = setup();
      const usernameInput = wrapper.find('#login-username');

      event.target.value = 'clintfidel';
      usernameInput.simulate('change', event);

      expect(wrapper.instance().state.username).toBe('clintfidel');
    });

    it('should set password state when input values changes', () => {
      const event = { target: { name: 'password', value: '' } };
      const wrapper = setup();
      const passwordInput = wrapper.find('#login-password');

      event.target.value = 'clintfidel';
      passwordInput.simulate('change', event);

      expect(wrapper.instance().state.password).toBe('clintfidel');
    });
  });

  describe('onSubmit()', () => {
    it('should not login user when there is no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.login-form');

      form.simulate('submit', event);
    });

    it('should login user when user details is set to the state', (done) => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.login-form');
      wrapper.setState({
        username: 'clintfidel',
        password: 'clintfidel'
      });

      form.simulate('submit', event);
      setTimeout(() => {
        wrapper.setState({ redirectUser: true });
        done();
      }, 3000);
    });
  });
});
