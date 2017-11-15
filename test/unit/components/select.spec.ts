import {SelectComponent} from '../../../src/components/select/select';
import {mount, Wrapper} from 'vue-test-utils';
import Vue from 'vue';
import SpyInstance = jest.SpyInstance;

let defaultProps = {
  id: 'genres',
  options: [
    {key: 'option1', value: 'Option 1'},
    {key: 'option2', value: 'Option 2'}
  ],
  placeholder: 'Select an option',
  multiple: false
};

describe('Select component', () => {

  let fakeBus: Vue;
  let busSpy: SpyInstance;
  beforeEach(() => {
    fakeBus = new Vue();
    busSpy = jest.spyOn(fakeBus, '$emit');
  });

  afterEach(() => {
    busSpy.mockReset();
    busSpy.mockRestore();
  });

  it('correctly sets the placeholder text', () => {
    let placeholder = 'Select an option';
    const wrapper: Wrapper<Vue> = mount(SelectComponent, {propsData: {placeholder} });
    expect(wrapper.vm.$props['placeholder']).toBe('Select an option');
    expect(wrapper.find('label > span').text()).toBe('Select an option');
  });

  it('selects a single option', () => {
    const wrapper: Wrapper<Vue> = mount(SelectComponent, {propsData: defaultProps, provide: {bus: fakeBus} });

    const option = wrapper.findAll('ul > li > input').at(0);
    option.trigger('click');

    expect(wrapper.findAll('label > span').at(1).text()).toBe('Option 1');

    expect(busSpy).toHaveBeenCalled();
    expect(busSpy).toBeCalledWith('genres', [{key: 'option1', value: 'Option 1'}]);
  });


  it('should close after selecting a single option', () => {
    const wrapper: Wrapper<Vue> = mount(SelectComponent, {propsData: defaultProps, provide: {bus: fakeBus} });

    const option = wrapper.findAll('ul > li > input').at(0);
    option.trigger('click');

    expect(wrapper.vm.$data['open']).toBeFalsy();
  });

  it('is able to select multiple options', () => {
    defaultProps.multiple = true;
    const wrapper: Wrapper<Vue> = mount(SelectComponent, {propsData: defaultProps, provide: {bus: fakeBus} });

    const option1 = wrapper.findAll('ul > li > input').at(0);
    option1.trigger('click');
    const option2 = wrapper.findAll('ul > li > input').at(1);
    option2.trigger('click');

    expect(wrapper.findAll('label > span').at(1).text()).toBe('Option 1, Option 2');

    expect(busSpy).toHaveBeenCalled();
    expect(busSpy).toBeCalledWith('genres', [{key: 'option1', value: 'Option 1'}, {key: 'option2', value: 'Option 2'}]);
  });

  it('should remove selected options when deselecting', () => {
    defaultProps.multiple = true;
    const wrapper: Wrapper<Vue> = mount(SelectComponent, {propsData: defaultProps, provide: {bus: fakeBus} });

    // Select first and second option:
    wrapper.findAll('ul > li > input').at(0).trigger('click');
    wrapper.findAll('ul > li > input').at(1).trigger('click');
    // Deselect first option:
    wrapper.findAll('ul > li > input').at(0).trigger('click');

    expect(wrapper.findAll('label > span').at(1).text()).toBe('Option 2');
  });

  it('should shorten the selected text when many options are selected', () => {
    defaultProps.multiple = true;
    defaultProps.options = [
      {key: 'option1', value: 'A very long option name'},
      {key: 'option2', value: 'Another very long option name'}
    ];
    const wrapper: Wrapper<Vue> = mount(SelectComponent, {propsData: defaultProps, provide: {bus: fakeBus} });

    // Select first and second option:
    wrapper.findAll('ul > li > input').at(0).trigger('click');
    wrapper.findAll('ul > li > input').at(1).trigger('click');

    expect(wrapper.findAll('label > span').at(1).text()).toBe('2 selected');
  });

});
