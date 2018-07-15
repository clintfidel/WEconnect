import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BusinessInfo from '../../../components/presentational/BusinessInfo';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    image: 'picture.png'
  };
  return shallow(<BusinessInfo {...props} />);
};


describe('Component: BusinessInfo', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(8);
    expect(wrapper.find('img').length).toBe(3);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('h5').length).toBe(4);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('span').length).toBe(5);
  });
  it('tests that renders with default image', () => {
    const wrapper = shallow(<BusinessInfo />);
    expect(wrapper.length).toBe(1);
  });
});
