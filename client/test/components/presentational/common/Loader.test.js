import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loader from '../../../../components/presentational/common/Loader';

configure({ adapter: new Adapter() });

describe('Component: Loader', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<Loader />);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
  });
});
