import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedRegisterBusiness,
{ RegisterBusiness } from '../../../components/container/RegisterBusiness';
import mockData from '../../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

let props;
const { allCategories, businessDetails } = mockData;
const setup = () => {
  props = {
    categories: allCategories.Categories,
    addBusinessAction: jest.fn(() => Promise.resolve()),
    imageUploadAction: jest.fn(() => Promise.resolve()),
    getAllCategoryAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<RegisterBusiness {...props} />);
};

describe('RegisterBusiness component', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
    global.FileReader = () => ({
      readAsDataURL: () => {},
      onload: () => {},
      result: () => {}
    });
  });
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(18);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('span').length).toBe(5);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('select').length).toBe(2);
    expect(wrapper.find('option').length).toBe(46);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });
  describe('componentDidMount()', () => {
    it('should call componentDidMount()', () => {
      setup().instance().componentDidMount();
    });
  });
  describe('onChange()', () => {
    let event;
    it('should set comments to state when input values changes', () => {
      event = { target: { name: 'name', value: '' } };
      const wrapper = setup();
      const businessNameInput = wrapper.find('#business-name');

      event.target.value = 'Sweet Business';
      businessNameInput.simulate('change', event);

      expect(wrapper.instance().state.businessDetails.name).toBe('Sweet Business');
    });
  });
  describe('imageUpload()', () => {
    it('should call imageUpload()', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        preventDefault: jest.fn(),
        target: {
          name: 'image',
          files: [{
            name: "business.jpg",
            lastModified: 1515159157000,
            size: 226679,
            type: "image/jpg",
            webkitRelativePath: ''

          }]
        }
      };
      action.imageUpload(event);
      let newImage = new Image();
      newImage = {
        src: FileReader.result
      };
      const file = event.target.files[0];
      action.setState({
        image: file,
        imageUrl: newImage.src
      });
      expect(action.state.image).toBe(file);
    });
  });
  describe('onSubmit()', () => {
    it('should not add business when there is no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.add-business');

      form.simulate('submit', event);
    });
    it('should add business when there is no details set to the state', (done) => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.add-business');
      wrapper.setState(businessDetails);

      form.simulate('submit', event);
      setTimeout(() => {
        wrapper.setState({ redirectUser: true });
        done();
      }, 3000);
    });
  });
});
describe('Connected RegisterBusiness component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({
      BusinessReducer: allCategories.Categories
    });
    const wrapper = shallow(<ConnectedRegisterBusiness store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
