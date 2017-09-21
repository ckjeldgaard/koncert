import { expect } from 'chai';
import {SelectComponent} from './select';
import Vue from 'vue';


describe('Select component', () => {

  it('correctly sets the placeholder text', () => {
    let id = 'genres';
    let options: any[] = [
      {key: 'option1', value: 'Option 1'},
      {key: 'option2', value: 'Option 2'},
      {key: 'option3', value: 'Option 3'}
    ];
    let placeholder = 'Select an option';
    let multiple = false;
    const ctor = Vue.extend(SelectComponent);
    const vm: any = new ctor({ propsData: { id, options, placeholder, multiple } }).$mount();

    expect(vm.placeholder).to.equal('Select an option');
    expect(vm.$el.querySelector('label span').textContent).to.equal('Select an option');
  });

});
