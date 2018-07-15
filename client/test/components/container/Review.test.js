import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedReview,
{ Review } from '../../../components/container/Review';
import mockData from '../../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

let props;
const { reviewResponse } = mockData;
const setup = (pathname) => {
  props = {
    reviews: reviewResponse.reviews.rows,
    addReviewAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<Review {...props} />);
};

describe('Review component', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(18);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
  });
  describe('onChange()', () => {
    let event;
    it('should set comments to state when input values changes', () => {
      event = { target: { name: 'comments', value: '' } };
      const wrapper = setup();
      const commentInput = wrapper.find('#comment-input');

      event.target.value = 'Nice Business';
      commentInput.simulate('change', event);

      expect(wrapper.instance().state.comments).toBe('Nice Business');
    });
    it('should set comments to state when input values changes', () => {
      event = { target: { name: 'comments', value: '' } };
      const wrapper = setup();
      const commentInput = wrapper.find('#comment-input');

      event.target.value = '';
      commentInput.simulate('change', event);

      expect(wrapper.instance().state.disableBtn).toBe(true);
    });
  });
  describe('onSubmit()', () => {
    it('should not post review when there is no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.review-form');

      form.simulate('submit', event);
    });
    it('should not post review when there is no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.review-form');
      wrapper.setState({
        comments: 'Nice Business',
        rate: 3
      });

      form.simulate('submit', event);
    });
    it('should not post review when there is no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.review-form');
      wrapper.setState({
        comments: 23,
        rate: 2
      });

      form.simulate('submit', event);
    });
  });
//   it('should call onClick()', () => {
//     setup().instance().onClick();
//   });
});
describe('Connected Review component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({
      ReviewsReducer: reviewResponse.reviews.rows,
      AuthReducer: 1
    });
    const wrapper = shallow(<ConnectedReview store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

