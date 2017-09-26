import { expect } from 'chai';
import {SelectComponent} from '../../../src/components/select/select';
import {mount, Wrapper} from 'avoriaz';
import {spy, assert, SinonSpy} from 'sinon';

let defaultProps = {
  id: 'genres',
  options: [
    {key: 'option1', value: 'Option 1'},
    {key: 'option2', value: 'Option 2'}
  ],
  placeholder: 'Select an option',
  multiple: false
};

const setBus = (wrapper: Wrapper, bus?: any): void => {
  wrapper.vm.$data['bus'] = {
    '$emit': bus
  };
};

describe('Select component', () => {

  let busSpy: SinonSpy;
  beforeEach(() => {
    busSpy = spy();
  });

  it('correctly sets the placeholder text', () => {
    let placeholder = 'Select an option';
    const wrapper: Wrapper = mount(SelectComponent, {propsData: {placeholder} });
    expect(wrapper.vm.$props['placeholder']).to.equal('Select an option');
    expect(wrapper.find('label > span')[0].text()).to.equal('Select an option');
  });

  it('selects a single option', () => {
    const wrapper: Wrapper = mount(SelectComponent, {propsData: defaultProps});
    setBus(wrapper, busSpy);

    const option = wrapper.find('ul > li > input')[0];
    option.trigger('click');

    expect(wrapper.find('label > span')[1].text()).to.equal('Option 1');
    assert.called(busSpy);
    assert.calledWith(busSpy, 'genres', [{key: 'option1', value: 'Option 1'}]);
  });

  it('should close after selecting a single option', () => {
    const wrapper: Wrapper = mount(SelectComponent, {propsData: defaultProps});
    setBus(wrapper, busSpy);

    const option = wrapper.find('ul > li > input')[0];
    option.trigger('click');

    expect(wrapper.vm.$data['open']).to.be.false;
  });

  it('is able to select multiple options', () => {
    defaultProps.multiple = true;
    const wrapper: Wrapper = mount(SelectComponent, {propsData: defaultProps});
    setBus(wrapper, busSpy);

    const option1 = wrapper.find('ul > li > input')[0];
    option1.trigger('click');
    const option2 = wrapper.find('ul > li > input')[1];
    option2.trigger('click');

    expect(wrapper.find('label > span')[1].text()).to.equal('Option 1, Option 2');
    assert.called(busSpy);
    assert.calledWith(busSpy, 'genres', [{key: 'option1', value: 'Option 1'}, {key: 'option2', value: 'Option 2'}]);
  });

  it('should remove selected options when deselecting', () => {
    defaultProps.multiple = true;
    const wrapper: Wrapper = mount(SelectComponent, {propsData: defaultProps});
    setBus(wrapper, busSpy);

    // Select first and second option:
    wrapper.find('ul > li > input')[0].trigger('click');
    wrapper.find('ul > li > input')[1].trigger('click');
    // Deselect first option:
    wrapper.find('ul > li > input')[0].trigger('click');

    expect(wrapper.find('label > span')[1].text()).to.equal('Option 2');
  });

  it('should shorten the selected text when many options are selected', () => {
    defaultProps.multiple = true;
    defaultProps.options = [
      {key: 'option1', value: 'A very long option name'},
      {key: 'option2', value: 'Another very long option name'}
    ];
    const wrapper: Wrapper = mount(SelectComponent, {propsData: defaultProps});
    setBus(wrapper, busSpy);

    // Select first and second option:
    wrapper.find('ul > li > input')[0].trigger('click');
    wrapper.find('ul > li > input')[1].trigger('click');

    expect(wrapper.find('label > span')[1].text()).to.equal('2 selected');
  });

});
