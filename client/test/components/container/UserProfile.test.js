import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedUserProfile,
{ UserProfile } from '../../../components/container/UserProfile';
import mockData from '../../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

let props;
const { userTemplate } = mockData;
const setup = () => {
  props = {
    count: 12,
    userProfile: userTemplate,
    getAllUserBusinessAction: jest.fn(() => Promise.resolve()),
    userProfileAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<UserProfile {...props} />);
};

describe('UserProfile component', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('hr').length).toBe(1);
  });
  it('should call componentDidMount()', () => {
    setup().instance().componentDidMount();
  });
});
describe('Connected UserProfile component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({
      AuthReducer: userTemplate,
      BusinessReducer: 12
    });
    const wrapper = shallow(<ConnectedUserProfile store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

