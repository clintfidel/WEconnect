import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedViewBusiness,
{ ViewBusiness } from '../../../components/container/ViewBusiness';
import mockData from '../../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

let props;
const { businessDetails } = mockData;
const setup = () => {
  props = {
    match: {
      params: {
        id: 1
      }
    },
    auth: {
      id: 1
    },
    history: {
      push: jest.fn()
    },
    business: businessDetails,
    getAllCategoryAction: jest.fn(() => Promise.resolve()),
    viewBusinessAction: jest.fn(() => Promise.resolve()),
    allReviewAction: jest.fn(() => Promise.resolve()),
    deleteBusinessAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<ViewBusiness {...props} />);
};

describe('ViewBusiness component', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    wrapper.setState({ loader: false });
    expect(wrapper.find('div').length).toBe(3);
  });
  it('should call componentDidMount()', () => {
    setup().instance().componentDidMount();
  });
  it('should call onClick()', () => {
    setup().instance().onClick({ preventDefault: () => 1 });
  });
  it('should call deleteBusiness()', () => {
    setup().instance().deleteBusiness();
  });
});
describe('Connected ViewBusiness component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({
      AuthReducer: {
        user: {
          id: 1
        }
      },
      BusinessReducer: businessDetails
    });
    const wrapper = shallow(<ConnectedViewBusiness store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
