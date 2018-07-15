import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedSearchBuiness,
{ SearchBuiness } from '../../../components/container/SearchBuiness';
import mockData from '../../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

let props;
const { allCategories } = mockData;
const setup = (pathname) => {
  props = {
    location: {
      pathname: pathname
    },
    allCategories: allCategories.Categories,
    getAllBusinessAction: jest.fn(() => Promise.resolve()),
    getAllUserBusinessAction: jest.fn(() => Promise.resolve()),
    searchBusinessAction: jest.fn(() => Promise.resolve()),
    searchUserBusinessAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<SearchBuiness {...props} />);
};

describe('SearchBuiness component', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('option').length).toBe(46);
    expect(wrapper.find('select').length).toBe(2);
    expect(wrapper.find('input').length).toBe(1);
  });
  it('should call onClick()', () => {
    setup().instance().onClick();
  });

  describe('handleSearch()', () => {
    let event;
    it('should set name to state to search all business when location is /all-business', () => {
      event = {
        preventDefault: jest.fn(),
        target: { name: 'name', value: '' }
      };
      const wrapper = setup("/all-business");
      const businessName = wrapper.find('#search-by-name');

      event.target.value = 'Andela Card business';
      businessName.simulate('change', event);

      expect(wrapper.instance().state.name).toBe('Andela Card business');
    });
    it('should set name to state to search user business when location is /userbusiness', () => {
      event = {
        preventDefault: jest.fn(),
        target: { name: 'name', value: '' }
      };
      const wrapper = setup("/userbusiness");
      const businessName = wrapper.find('#search-by-name');

      event.target.value = 'Andela Card business';
      businessName.simulate('change', event);

      expect(wrapper.instance().state.name).toBe('Andela Card business');
    });
    it('should set name to state to search user business when location is /userbusiness', () => {
      event = {
        preventDefault: jest.fn(),
        target: { name: 'name', value: '' }
      };
      const wrapper = setup("/userbusiness");
      const businessName = wrapper.find('#search-by-name');

      event.target.value = 'Andela Card business';
      businessName.simulate('change', event);

      expect(wrapper.instance().state.name).toBe('Andela Card business');
    });
    it('should set location to state to search user business when location is /userbusiness', () => {
      event = {
        preventDefault: jest.fn(),
        target: { name: 'location', value: '' }
      };
      const wrapper = setup("/userbusiness");
      const locationInput = wrapper.find('#location');

      event.target.value = 'Select From...';
      locationInput.simulate('change', event);

      expect(wrapper.instance().state.location).toBe('');
    });
    it('should set location to state to search user business when location is /all-business', () => {
      event = {
        preventDefault: jest.fn(),
        target: { name: 'location', value: '' }
      };
      const wrapper = setup("/all-business");
      const locationInput = wrapper.find('#location');

      event.target.value = 'Select From...';
      locationInput.simulate('change', event);

      expect(wrapper.instance().state.location).toBe('Select From...');
    });
    it('should set location to state to search user business when location is /all-business', () => {
      event = {
        preventDefault: jest.fn(),
        target: { name: 'location', value: '' }
      };
      const wrapper = setup("/all-business");
      const locationInput = wrapper.find('#location');

      event.target.value = '';
      locationInput.simulate('change', event);

      expect(wrapper.instance().state.location).toBe('');
    });
    it('should set location to state to search user business when location is /userbusiness', () => {
      event = {
        preventDefault: jest.fn(),
        target: { name: 'location', value: '' }
      };
      const wrapper = setup("/userbusiness");
      const locationInput = wrapper.find('#location');

      event.target.value = '';
      locationInput.simulate('change', event);

      expect(wrapper.instance().state.location).toBe('');
    });
  });
});
describe('Connected SearchBuiness component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({
      BusinessReducer: allCategories.Categories
    });
    const wrapper = shallow(<ConnectedSearchBuiness store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

