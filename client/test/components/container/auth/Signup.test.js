import React from 'react';
import expect from 'expect';
import $ from 'jquery';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Signup } from '../../../../components/container/auth/Signup';
import mockData from '../../../mocks/mockData';
import mockLocalStorage from '../../../mocks/mockLocalStorage';

configure({ adapter: new Adapter() });

window.localStorage = mockLocalStorage.setItem("token", "dek3dcndx.sejhdbsfd");

let props;
const { userInput } = mockData;
const setup = () => {
  props = {
    history: {
      push: jest.fn()
    },
    registerAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<Signup {...props} />);
};

describe('Component: Signup', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
    let jquery = global.jQuery;
    jquery = $;
    global.$ = jquery;
  });

  describe('Signup component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).toBe(9);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('input').length).toBe(5);
      expect(wrapper.find('main').length).toBe(1);
      expect(wrapper.find('img').length).toBe(1);
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.find('Link').length).toBe(2);
    });
  });

  describe('onChange()', () => {
    it('should set username to state when input values changes', () => {
      const event = { target: { name: 'username', value: '' } };
      const wrapper = setup();
      const usernameInput = wrapper.find('#signup-username');

      event.target.value = 'clintfidel';
      usernameInput.simulate('change', event);

      expect(wrapper.instance().state.username).toBe('clintfidel');
    });

    it('should set fullname state when input values changes', () => {
      const event = { target: { name: 'fullname', value: '' } };
      const wrapper = setup();
      const fullNameInput = wrapper.find('#signup-fullName');

      event.target.value = 'Clint Fidelis';
      fullNameInput.simulate('change', event);

      expect(wrapper.instance().state.fullname).toBe('Clint Fidelis');
    });

    it('should set email state when input values changes', () => {
      const event = { target: { name: 'email', value: '' } };
      const wrapper = setup();
      const emailInput = wrapper.find('#signup-email');

      event.target.value = 'clintfidel@gmail.com';
      emailInput.simulate('change', event);

      expect(wrapper.instance().state.email).toBe('clintfidel@gmail.com');
    });

    it('should set password state when input values changes', () => {
      const event = { target: { name: 'password', value: '' } };
      const wrapper = setup();
      const passwordInput = wrapper.find('#signup-password');

      event.target.value = 'clintfidel';
      passwordInput.simulate('change', event);

      expect(wrapper.instance().state.password).toBe('clintfidel');
    });

    it('should set passwordConfirm state when input values changes', () => {
      const event = { target: { name: 'passwordConfirm', value: '' } };
      const wrapper = setup();
      const cpasswordInput = wrapper.find('#signup-cpassword');

      event.target.value = 'clintfidel';
      cpasswordInput.simulate('change', event);

      expect(wrapper.instance().state.passwordConfirm).toBe('clintfidel');
    });
  });

  describe('onSubmit()', () => {
    it('should not signup user when there is no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.signup-form');

      form.simulate('submit', event);
    });

    it('should signup user when user details is set to the state', (done) => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.signup-form');
      wrapper.setState(userInput);

      form.simulate('submit', event);
      setTimeout(() => {
        wrapper.setState({ redirectUser: true });
        done();
      }, 3000);
    });
  });

  describe('onFocus()', () => {
    it('should clear fullname error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'fullname', value: 'clint' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.fullnameError).toBe('');
    });

    it('should clear username error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'username', value: 'clint' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.usernameError).toBe('');
    });

    it('should clear password error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'password', value: 'clint' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.passwordError).toBe('');
    });

    it('should clear cpassword error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'passwordConfirm', value: 'clin' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.passwordConfirmError).toBe('');
    });

    it('should clear email error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'email', value: 'clint' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.emailError).toBe('');
    });
  });

  describe('onBlur()', () => {
    it('should set fullnameError for invalid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'fullname',
          value: 'clin'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.fullnameError)
        .toEqual('Username should be more than 5 characters');
    });

    it('should set fullnameError to be empty for valid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'fullname',
          value: 'clintfidel'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.fullnameError)
        .toEqual('');
    });
    it('should set usernameError for invalid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'username',
          value: 'clin'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.usernameError)
        .toEqual('Username should be more than 5 characters long');
    });

    it('should set usernameError to be empty for valid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'username',
          value: 'clintfidel'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.usernameError)
        .toEqual('');
    });

    it('should set passwordError for invalid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'password',
          value: 'clint'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.passwordError)
        .toEqual('Password should be more than 8 characters long');
    });

    it('should set passwordError to be empty for valid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'password',
          value: 'clintfidel'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.passwordError)
        .toEqual('');
    });

    it('should set passwordConfirmError for invalid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'passwordConfirm',
          value: 'clin'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.passwordConfirmError)
        .toEqual('password do not match!');
    });
  });
});
