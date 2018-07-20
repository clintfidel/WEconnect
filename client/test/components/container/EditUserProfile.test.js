import React from 'react';
import expect from 'expect';
import $ from 'jquery';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedEditUserProfile,
{ EditUserProfile } from '../../../components/container/EditUserProfile';
import mockData from '../../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

let props;
const { userTemplate } = mockData;
const setup = () => {
  props = {
    userDetailStorage: userTemplate,
    editUserProfileAction: jest.fn(() => Promise.resolve()),
    imageUploadAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<EditUserProfile {...props} />);
};

describe('EditUserProfile component', () => {
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
    let jquery = global.jQuery;
    jquery = $;
    global.$ = jquery;
  });
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(16);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('span').length).toBe(5);
    expect(wrapper.find('label').length).toBe(4);
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('strong').length).toBe(4);
    expect(wrapper.find('form').length).toBe(1);
  });
  describe('componentWillReceiveProps()', () => {
    it('component should receive props', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const nextProps = {
        user: userTemplate
      };
      action.componentWillReceiveProps(nextProps);
      expect(action.state.userTemplate).toBe(nextProps.user);
    });
  });
  describe('onChange()', () => {
    let event;
    it('should set comments to state when input values changes', () => {
      event = { target: { name: 'fullname', value: 'clint fidel' } };
      const wrapper = setup();
      const fullNameInput = wrapper.find('#edit-fullname');

      event.target.value = 'Clinton Fidelis';
      fullNameInput.simulate('change', event);

      expect(wrapper.instance().state.userTemplate.fullname).toBe('Clinton Fidelis');
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
    it('should not edit user profile when there is no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.edit-profile');

      form.simulate('submit', event);
    });
    it('should edit user profile when there is no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.edit-profile');
      wrapper.setState(userTemplate);

      form.simulate('submit', event);
    });
  });
});
describe('Connected EditUserProfile component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({
      AuthReducer: userTemplate
    });
    const wrapper = shallow(<ConnectedEditUserProfile store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
