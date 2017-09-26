import Vue from 'vue';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
import { spy, assert } from 'sinon';
import { expect } from 'chai';
import {ComponentTest, MockLogger} from '../../../src/util/component-test';
import { DrawerComponent } from '../../../src/components/drawer/drawer';

let loggerSpy = spy();

@Component({
  template: require('../../../src/components/drawer/drawer.html')
})
class MockDrawerComponent extends DrawerComponent {
  constructor() {
    super();
    this.logger = new MockLogger(loggerSpy);
  }
}

describe('Drawer component', () => {
  let directiveTest: ComponentTest;
  let router: VueRouter;

  before(() => {
    Vue.use(VueRouter);
    directiveTest = new ComponentTest('<div><drawer></drawer><router-view>loading...</router-view></div>', { 'drawer': MockDrawerComponent });

    let homeComponent = { template: '<div class="home">Home</div>' };
    let aboutComponent = { template: '<div class="about">About</div>' };

    router = new VueRouter({
      routes: [
        { path: '/', component: homeComponent },
        { path: '/about', component: aboutComponent }
      ]
    });
  });

  it('should render correct contents', async () => {
    directiveTest.createComponent({ router: router });

    await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
      expect(vm.$el.querySelectorAll('nav a').length).to.equal(3);
    });
  });

  describe('When clicking the about link', () => {
    beforeEach(async () => {
      directiveTest.createComponent({ router: router });

      await directiveTest.execute((vm) => {
        let anchor = <HTMLAnchorElement>vm.$el.querySelector('nav a[href="#/about"]');
        anchor.click();
      });
    });

    it('should render correct about contents', async () => {
      await directiveTest.execute((vm) => {
        expect(vm.$el.querySelector('div.about').textContent).to.equal('About');
      });
    });
  });

});