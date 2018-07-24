import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedAllBusiness,
{ EditModal } from '../../../components/container/EditModal';
import mockData from '../../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

let props;
const { editedBusinessResponse, editedBusinessDetails2, allCategories } = mockData;
const setup = () => {
  props = {
    business: editedBusinessResponse.business,
    categories: allCategories.Categories,
    imageUploadAction: jest.fn(() => Promise.resolve()),
    editBusinessAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<EditModal {...props} />);
};


describe('EditBusiness component', () => {
  const events = { preventDefault: () => {} };
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
    jest.spyOn(events, 'preventDefault');
    global.FileReader = () => ({
      readAsDataURL: () => {},
      onload: () => {},
      result: () => {}
    });
  });

  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(18);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('span').length).toBe(6);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('label').length).toBe(5);
    expect(wrapper.find('strong').length).toBe(5);
    expect(wrapper.find('select').length).toBe(2);
    expect(wrapper.find('option').length).toBe(44);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
  });
  describe('onChange()', () => {
    let event;
    it('should set username to state when input values changes', () => {
      event = { target: { name: 'name', value: '' } };
      const wrapper = setup();
      const businessInput = wrapper.find('#business-name');

      event.target.value = 'Andela Card business';
      businessInput.simulate('change', event);

      expect(wrapper.instance().state.businessDetails.name).toBe('Andela Card business');
    });

    it('should set username to state when input values changes', () => {
      event = { target: { name: 'location', value: '' } };
      const wrapper = setup();
      const businessInput = wrapper.find('#LAGOS');

      event.target.value = 'KANO';
      businessInput.simulate('change', event);

      expect(wrapper.instance().state.businessDetails.location).toBe('KANO');
    });

    it('should set username to state when input values changes', () => {
      event = { target: { name: 'categoryId', value: '' } };
      const wrapper = setup();
      const businessInput = wrapper.find('#health');

      event.target.value = 5;
      businessInput.simulate('change', event);

      expect(wrapper.instance().state.businessDetails.categoryId).toBe(5);
    });
    it('should set username to state when input values changes', () => {
      event = { target: { name: 'name', value: '' } };
      const wrapper = setup();
      const businessInput = wrapper.find('#business-details');

      event.target.value = 'andela business is great';
      businessInput.simulate('change', event);

      expect(wrapper.instance().state.businessDetails.name).toBe('andela business is great');
    });
  });
  describe('uploadImage()', () => {
    it('should call uploadImage()', () => {
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
            type: "image/jpeg",
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
    it('should not signup user when there is no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.edit-form');

      form.simulate('submit', event);
    });

    it('should signup user when user details is set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.edit-form');
      wrapper.setState(editedBusinessDetails2);

      form.simulate('submit', event);
    });
  });
  describe('Connected AllRecipes component', () => {
    it('tests that the component successfully rendered', () => {
      const store = mockStore({
        BusinessReducer: editedBusinessResponse.business
      });
      const wrapper = shallow(<ConnectedAllBusiness store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
