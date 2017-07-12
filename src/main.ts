import * as mdc from 'material-components-web';
import * as Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment';

import { HomeComponent } from './components/home';
import { AboutComponent } from './components/about';
import {DrawerComponent} from './components/drawer';
import {ConcertsComponent} from './components/concerts/concerts';
import {ProvinceFilterComponent} from './components/province_filter/province_filter';
import {ConcertDetailsComponent} from './components/concert_details/concert_details';
import {serviceApi, bus} from './util/constants';
import {FirebaseServiceApi} from './data/firebase-service-api';

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

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment.unix(value).format('Do MMMM YYYY');
  }
});

Vue.component('concerts', ConcertsComponent);
Vue.component('province_filter', ProvinceFilterComponent);
Vue.component('concert_details', ConcertDetailsComponent);

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'drawer': DrawerComponent
  },
  provide() {
    return {
      [serviceApi]: new FirebaseServiceApi('koncert'),
      [bus]: new Vue(),
    };
  }
});
