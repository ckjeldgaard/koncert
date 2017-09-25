import { expect } from 'chai';
import {SelectComponent} from './select';
import {mount, Wrapper} from 'avoriaz';
import { spy, assert } from 'sinon';
import {isUndefined} from "util";

let props = {
  id: 'genres',
  options: [
    {key: 'option1', value: 'Option 1'},
    {key: 'option2', value: 'Option 2'}
  ],
  placeholder: 'Select an option',
  multiple: false
};

describe('Select component', () => {
  it('correctly sets the placeholder text', () => {
    let placeholder = 'Select an option';
    const wrapper: Wrapper = mount(SelectComponent, {propsData: {placeholder} });
    expect(wrapper.vm.$props['placeholder']).to.equal('Select an option');
    expect(wrapper.find('label > span')[0].text()).to.equal('Select an option');
  });

  it('selects a single option', () => {
    const busSpy = spy();
    const wrapper: Wrapper = mount(SelectComponent, {propsData: props});
    wrapper.vm.$data['bus'] = {
      '$emit': busSpy
    };

    const option = wrapper.find('ul > li > input')[0];
    option.trigger('click');

    expect(wrapper.find('label > span')[1].text()).to.equal('Option 1');
    assert.called(busSpy);
    assert.calledWith(busSpy, 'genres', [{key: 'option1', value: 'Option 1'}]);
  });

  it('is able to select multiple options', () => {
    const busSpy = spy();
    props.multiple = true;
    const wrapper: Wrapper = mount(SelectComponent, {propsData: props});
    wrapper.vm.$data['bus'] = {
      '$emit': busSpy
    };

    const option1 = wrapper.find('ul > li > input')[0];
    option1.trigger('click');
    const option2 = wrapper.find('ul > li > input')[1];
    option2.trigger('click');

    expect(wrapper.find('label > span')[1].text()).to.equal('Option 1, Option 2');
    assert.called(busSpy);
    assert.calledWith(busSpy, 'genres', [{key: 'option1', value: 'Option 1'}, {key: 'option2', value: 'Option 2'}]);
  });

  it('should remove selected options when deselecting', () => {
    const busSpy = spy();
    props.multiple = true;
    const wrapper: Wrapper = mount(SelectComponent, {propsData: props});
    wrapper.vm.$data['bus'] = {
      '$emit': busSpy
    };

    // Select first and second option:
    wrapper.find('ul > li > input')[0].trigger('click');
    wrapper.find('ul > li > input')[1].trigger('click');
    // Deselect first option:
    wrapper.find('ul > li > input')[0].trigger('click');

    expect(wrapper.find('label > span')[1].text()).to.equal('Option 2');
  });

});
