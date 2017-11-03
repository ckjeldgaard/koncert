import * as main from '../../src/main';
import Vue from 'vue';

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
    const wrapper: Wrapper<Vue> = shallow(main.app, {template: '<div id="app-main"></div>' });
    console.log('VUE APP = ', wrapper);
    expect(1).toBe(2);
    */
  });

});
