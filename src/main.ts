import * as mdc from 'material-components-web';
import {MDCTemporaryDrawer, MDCTemporaryDrawerFoundation, util} from '@material/drawer';
import * as Vue from 'vue';
import VueRouter from 'vue-router';

import { HomeComponent } from './components/home';
import { AboutComponent } from './components/about';
import { ListComponent } from './components/list';
import { NavbarComponent } from './components/navbar';

// register the plugin
Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/about', component: AboutComponent },
    { path: '/list', component: ListComponent },
  ]
});

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'navbar': NavbarComponent
  }
});

mdc.autoInit();

let drawerEl = document.querySelector('.mdc-temporary-drawer');
let MDCTemporaryDrawer = mdc.drawer.MDCTemporaryDrawer;
let drawer = new MDCTemporaryDrawer(drawerEl);
document.querySelector('.menu-button').addEventListener('click', function() {
  drawer.open = true;
});
drawerEl.addEventListener('MDCTemporaryDrawer:open', function() {
  console.log('Received MDCTemporaryDrawer:open');
});
drawerEl.addEventListener('MDCTemporaryDrawer:close', function() {
  console.log('Received MDCTemporaryDrawer:close');
});
