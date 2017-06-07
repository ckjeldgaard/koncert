import * as mdc from 'material-components-web';
import * as Vue from 'vue';
import VueRouter from 'vue-router';

import { HomeComponent } from './components/home';
import { AboutComponent } from './components/about';
import {DrawerComponent} from './components/drawer';

// register the plugin
Vue.use(VueRouter);
console.log('mdc.autoInit()');
mdc.autoInit();

let router = new VueRouter({
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/about', component: AboutComponent }
  ]
});

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'drawer': DrawerComponent
  }
});
