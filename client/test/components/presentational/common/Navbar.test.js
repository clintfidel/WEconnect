import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavBar } from '../../../../components/presentational/common/NavBar';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    history: {
      push: jest.fn()
    },
    logoutAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<NavBar {...props} />);
};

describe('Component: NavBar', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(4);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(6);
  });
  it('should call logout()', () => {
    setup().instance().logout();
  });
});
