import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedUserBusiness,
{ UserBusiness } from '../../../components/container/UserBusiness';
import mockData from '../../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

let props;
const { getBusinessDetails, BusinessDetailsWithoutReview } = mockData;
const setup = (businessDetails) => {
  props = {
    count: 12,
    businesses: businessDetails,
    history: {
      push: jest.fn()
    },
    getAllCategoryAction: jest.fn(() => Promise.resolve()),
    getAllUserBusinessAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<UserBusiness {...props} />);
};


describe('UserBusiness component', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup(getBusinessDetails.businesses.rows);
    expect(wrapper.find('div').length).toBe(4);
  });
  it('tests that the component successfully rendered without loader', () => {
    const wrapper = setup(getBusinessDetails.businesses.rows);
    wrapper.setState({ loader: false });
    expect(wrapper.instance().state.loader).toBe(false);
    expect(wrapper.find('h1').length).toBe(1);
  });
  it('tests that the component successfully rendered without loader', () => {
    const wrapper = setup([]);
    expect(wrapper.length).toBe(1);
  });
  it('should call handlePageChange()', () => {
    setup(BusinessDetailsWithoutReview).instance().handlePageChange(1);
  });
});
describe('Connected userBusiness component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({
      BusinessReducer: getBusinessDetails.businesses
    });
    const wrapper = shallow(<ConnectedUserBusiness store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

