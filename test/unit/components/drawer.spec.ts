import Vue from 'vue';
import VueRouter from 'vue-router';
import { expect } from 'chai';
import { DrawerComponent } from '../../../src/components/drawer/drawer';
import {mount, Wrapper} from 'vue-test-utils';

describe('Drawer component', () => {

  let router: VueRouter;

  beforeEach(() => {
    Vue.use(VueRouter);
    const homeComponent = { template: '<div class="home">Home</div>' };
    const aboutComponent = { template: '<div class="about">About</div>' };

    router = new VueRouter({
      routes: [
        { path: '/', component: homeComponent },
        { path: '/about', component: aboutComponent }
      ]
    });
  });

  it('should render correct contents', () => {
    const wrapper: Wrapper<Vue> = mount(DrawerComponent, { router: router});
    expect(wrapper.findAll('nav a').length).to.equal(3);
  });

  it('should render correct about contents when clicking link', () => {
    const wrapper: Wrapper<Vue> = mount(DrawerComponent, { router: router});
    wrapper.find('nav a[href="#/about"]').trigger('click');
    expect(router.currentRoute.path).to.equal('/about');
  });

});
