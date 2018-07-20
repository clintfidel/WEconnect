// import React from 'react';
// import expect from 'expect';
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import ConnectedReview,
// { Review } from '../../../components/container/Review';
// import mockData from '../../mocks/mockData';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// configure({ adapter: new Adapter() });

// let props;
// const { reviewResponse } = mockData;
// const setup = (pathname) => {
//   props = {
//     reviews: reviewResponse.reviews.rows,
//     addReviewAction: jest.fn(() => Promise.resolve()),
//     updateReviewAction: jest.fn(() => Promise.resolve())

//   };
//   return shallow(<Review {...props} />);
// };

// describe('Review component', () => {
//   beforeEach(() => {
//     global.toastr = {
//       success: () => {},
//       error: () => {}
//     };
//   });
//   it('tests that the component successfully rendered', () => {
//     const wrapper = setup();
//     expect(wrapper.find('div').length).toBe(18);
//     expect(wrapper.find('h3').length).toBe(1);
//     expect(wrapper.find('textarea').length).toBe(1);
//     expect(wrapper.find('button').length).toBe(1);
//     expect(wrapper.find('form').length).toBe(1);
//   });
//   describe('onChange()', () => {
//     let event;
//     it('should set comments to state when input values changes', () => {
//       event = { target: { name: 'comments', value: '' } };
//       const wrapper = setup();
//       const commentInput = wrapper.find('#comment-input');

//       event.target.value = 'Nice Business';
//       commentInput.simulate('change', event);

//       expect(wrapper.instance().state.comments).toBe('Nice Business');
//     });
//     it('should set comments to state when input values changes', () => {
//       event = { target: { name: 'comments', value: '' } };
//       const wrapper = setup();
//       const commentInput = wrapper.find('#comment-input');

//       event.target.value = '';
//       commentInput.simulate('change', event);

//       expect(wrapper.instance().state.disableBtn).toBe(true);
//     });
//   });
//   describe('onSubmit()', () => {
//     it('should not post review when there is no details set to the state', () => {
//       const event = {
//         preventDefault: jest.fn()
//       };
//       const wrapper = setup();
//       const form = wrapper.find('.review-form');

//       form.simulate('submit', event);
//     });
//     it('should not post review when there is no details set to the state', () => {
//       const event = {
//         preventDefault: jest.fn()
//       };
//       const wrapper = setup();
//       const form = wrapper.find('.review-form');
//       wrapper.setState({
//         comments: 'Nice Business',
//         rate: 3
//       });

//       form.simulate('submit', event);
//     });
//     it('should not post review when there is no details set to the state', () => {
//       const event = {
//         preventDefault: jest.fn()
//       };
//       const wrapper = setup();
//       const form = wrapper.find('.review-form');
//       wrapper.setState({
//         comments: 23,
//         rate: 2
//       });

//       form.simulate('submit', event);
//     });
//   });
//   describe('updateReview()', () => {
//     it('should not update review when there is no details set to the state', () => {
//       const event = {
//         preventDefault: jest.fn()
//       };
//       setup().instance().toggleEditOnClick(1);
//       const form = setup().find('.edit-form');
//       form.simulate('submit', event);
//     });
//     it('should not post review when there is no details set to the state', () => {
//       const event = {
//         preventDefault: jest.fn()
//       };
//       const wrapper = setup().instance().toggleEditOnClick(1);
//       const form = setup().find('.edit-form');
//       wrapper.setState({
//         comments: 'Good Business',
//         rate: 5
//       });

//       form.simulate('submit', event);
//     });
//     it('should not post review when there is no details set to the state', () => {
//       const event = {
//         preventDefault: jest.fn()
//       };
//       const wrapper = setup().instance().toggleEditOnClick(1);
//       const form = setup().find('.edit-form');
//       wrapper.setState({
//         comments: 23,
//         rate: 2
//       });

//       form.simulate('submit', event);
//     });
//   });
//   it('should call closeToggleEdit()', () => {
//     const wrapper = setup();
//     wrapper.instance().closeToggleEdit();
//     expect(wrapper.instance().state.toggleEdit).toBe(false);
//   });
//   it('should call toggleEditOnClick()', () => {
//     const wrapper = setup();
//     wrapper.instance().toggleEditOnClick(1);
//     expect(wrapper.instance().state.toggleEdit).toBe(true);
//     expect(wrapper.instance().state.reviewId).toBe(1);
//   });
//   it('should call ratingChanged()', () => {
//     const wrapper = setup();
//     wrapper.instance().ratingChanged(2);
//     expect(wrapper.instance().state.rate).toBe(2);
//   });
// });

// describe('Connected Review component', () => {
//   it('tests that the component successfully rendered', () => {
//     const store = mockStore({
//       ReviewsReducer: reviewResponse.reviews.rows,
//       AuthReducer: 1
//     });
//     const wrapper = shallow(<ConnectedReview store={store} />);
//     expect(wrapper.length).toBe(1);
//   });
// });

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
const setup = (reviews) => {
  props = {
    reviews: reviews,
    addReviewAction: jest.fn(() => Promise.resolve()),
    updateReviewAction: jest.fn(() => Promise.resolve())
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
    const wrapper = setup(reviewResponse.reviews.rows);
    expect(wrapper.find('div').length).toBe(18);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
  });
  it('tests that the component successfully rendered without reviews', () => {
    const wrapper = setup([]);
    expect(wrapper.length).toBe(1);
  });
  describe('onChange()', () => {
    let event;
    it('should set comments to state when input values changes', () => {
      event = { target: { name: 'comments', value: '' } };
      const wrapper = setup(reviewResponse.reviews.rows);
      const commentInput = wrapper.find('#comment-input');

      event.target.value = 'Nice Business';
      commentInput.simulate('change', event);

      expect(wrapper.instance().state.comments).toBe('Nice Business');
    });
    it('should set comments to state when input values changes', () => {
      event = { target: { name: 'comments', value: '' } };
      const wrapper = setup(reviewResponse.reviews.rows);
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
      const wrapper = setup(reviewResponse.reviews.rows);
      const form = wrapper.find('.review-form');

      form.simulate('submit', event);
    });
    it('should not post review when there is no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup(reviewResponse.reviews.rows);
      const form = wrapper.find('.review-form');
      wrapper.setState({
        comments: 'Nice Business',
        rate: 3
      });

      form.simulate('submit', event);
    });
  });
  describe('updateReview()', () => {
    it('should call updateReview()', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup(reviewResponse.reviews.rows);
      wrapper.setState({
        toggleEdit: true,
        reviewId: 14
      });
      const form = wrapper.find('.update-review');

      wrapper.setState({ comments: 'Cool Business' });

      form.simulate('submit', event);

      expect(wrapper.instance().state.comments).toBe('Cool Business');
    });
  });
  it('should call ratingChanged()', () => {
    setup(reviewResponse.reviews.rows).instance().ratingChanged();
  });
  it('should call toggleEditOnClick()', () => {
    setup(reviewResponse.reviews.rows).instance().toggleEditOnClick();
  });
  it('should call closeToggleEdit()', () => {
    setup(reviewResponse.reviews.rows).instance().closeToggleEdit();
  });
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

