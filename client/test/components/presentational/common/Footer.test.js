import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../../../components/presentational/common/Footer';

configure({ adapter: new Adapter() });

describe('Component: Footer', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('p').length).toBe(1);
  });
});
