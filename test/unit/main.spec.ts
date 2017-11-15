import * as main from '../../src/main';
import Vue from 'vue/dist/vue.js';
import {shallow, Wrapper} from 'vue-test-utils';

let vueApp: Vue;

describe('Main', () => {

  beforeEach(() => {
    vueApp = <Vue>main.app;
  });

  it('should initialize data correctly', () => {
    expect(vueApp.$data['displayContent']).toBeTruthy();
    expect(vueApp.$data['displayError']).toBeFalsy();
    expect(vueApp.$data['errorMessage']).toBe('');
  });

  it('should provide a service API', () => {
    /*
    let extended = Vue.component('mainApp', vueApp);
    console.log('extended = ', extended);
    const wrapper: Wrapper<Vue> = shallow(vueApp);
    console.log('wrapper = ', wrapper);

    expect(1).toBe(2);
    */
  });

});
