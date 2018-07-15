import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from '../../../components/presentational/HomePage';
import mockLocalStorage from '../../mocks/mockLocalStorage';

configure({ adapter: new Adapter() });

window.localStorage = mockLocalStorage.setItem('token', 'dek3dcndx.sejhdbsfd');


let props;
const setup = () => {
  props = {
    history: {
      push: jest.fn(() => Promise.resolve())
    }
  };
  return shallow(<HomePage {...props} />);
};

describe('Component: HomePage', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('main').length).toBe(1);
    expect(wrapper.find('section').length).toBe(3);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(2);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('Link').length).toBe(2);
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('img').length).toBe(5);
    expect(wrapper.find('p').length).toBe(6);
    expect(wrapper.find('hr').length).toBe(1);
  });
  it('should call componentWillMount()', () => {
    setup().instance().componentWillMount();
  });
});
