import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Businesses from '../../../components/presentational/Businesses';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    image: 'picture.png'
  };
  return shallow(<Businesses {...props} />);
};

describe('Component: Businesses', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(10);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('p').length).toBe(2);
    expect(wrapper.find('h5').length).toBe(1);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('i').length).toBe(1);
  });
  it('tests that renders with default image', () => {
    const wrapper = shallow(<Businesses />);
    expect(wrapper.length).toBe(1);
  });
});
