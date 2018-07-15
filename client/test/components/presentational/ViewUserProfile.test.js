import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ViewUserProfile
  from '../../../components/presentational/ViewUserProfile';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    image: 'picture.png'
  };
  return shallow(<ViewUserProfile {...props} />);
};

describe('Component: ViewUserProfile', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('table').length).toBe(1);
    expect(wrapper.find('tr').length).toBe(4);
    expect(wrapper.find('td').length).toBe(8);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('tbody').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
  });
  it('tests that renders with default image', () => {
    const wrapper = shallow(<ViewUserProfile />);
    expect(wrapper.length).toBe(1);
  });
});
