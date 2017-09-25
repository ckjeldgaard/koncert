import { expect } from 'chai';
import {SelectComponent} from './select';
import {mount, Wrapper} from 'avoriaz';
import { spy, assert } from 'sinon';

describe('Select component', () => {
  it('correctly sets the placeholder text', () => {
    let placeholder = 'Select an option';
    const wrapper: Wrapper = mount(SelectComponent, {propsData: {placeholder} });
    expect(wrapper.vm.$props['placeholder']).to.equal('Select an option');
    expect(wrapper.find('label > span')[0].text()).to.equal('Select an option');
  });

  it('selects a single option', () => {
    const busSpy = spy();
    const wrapper: Wrapper = mount(
      SelectComponent, {
        propsData: {
          id: 'genres',
          options: [
            {key: 'option1', value: 'Option 1'},
            {key: 'option2', value: 'Option 2'}
          ],
          placeholder: 'Select an option',
          multiple: false}
      }
    );
    wrapper.vm.$data['bus'] = {
      '$emit': busSpy
    };

    const option = wrapper.find('ul > li > input')[0];
    option.trigger('click');

    expect(wrapper.find('label > span')[1].text()).to.equal('Option 1');
    assert.called(busSpy);
    assert.calledWith(busSpy, 'genres', [{key: 'option1', value: 'Option 1'}]);
  });

});
