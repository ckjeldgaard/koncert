import { expect } from 'chai';
import {SelectComponent} from './select';
import {mount, Wrapper} from 'avoriaz';


describe('Select component', () => {
  it('correctly sets the placeholder text', () => {
    let placeholder = 'Select an option';
    const wrapper: Wrapper = mount(SelectComponent, {propsData: {placeholder} });
    expect(wrapper.propsData().placeholder).to.equal('Select an option');
    expect(wrapper.find('label > span')[0].text()).to.equal('Select an option');
  });


  it('selects an option', () => {
    let id = 'genres';
    let options: any[] = [
      {key: 'option1', value: 'Option 1'},
      {key: 'option2', value: 'Option 2'},
      {key: 'option3', value: 'Option 3'}
    ];
    let placeholder = 'Select an option';
    let multiple = false;

    const wrapper: Wrapper = mount(SelectComponent, {propsData: {id, options, placeholder, multiple} });
    const option = wrapper.find('ul > li > input')[0];
    option.trigger('click');

    expect(wrapper.find('label > span')[1].text()).to.equal('Option 1');
  });

});
