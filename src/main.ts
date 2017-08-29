import * as Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment';

import { HomeComponent } from './components/home';
import { AboutComponent } from './components/about';
import {DrawerComponent} from './components/drawer';
import {SpinnerComponent} from './components/spinner';
import {ConcertsComponent} from './components/concerts/concerts';
import {ProvinceFilterComponent} from './components/province_filter/province_filter';
import {GenreFilterComponent} from './components/genre_filter/genre_filter';
import {serviceApi, bus} from './util/constants';
import {FirebaseServiceApi} from './data/firebase-service-api';
import {ErrorComponent} from './components/error/error';
import {SelectComponent} from './components/select/select';

// register the plugin
Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/about', component: AboutComponent }
  ]
});

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment.unix(value).format('dddd, MMM Do YYYY');
  }
});

Vue.component('concerts', ConcertsComponent);
Vue.component('spinner', SpinnerComponent);
Vue.component('province_filter', ProvinceFilterComponent);
Vue.component('genre_filter', GenreFilterComponent);
Vue.component('error', ErrorComponent);
Vue.component('multiselect', SelectComponent);

const eventBus = new Vue();

let app = new Vue({
  el: '#app-main',
  router: router,
  components: {
    'drawer': DrawerComponent,
    'error': ErrorComponent
  },
  data: {
    displayContent: true,
    displayError: false,
    errorMessage: String,
  },
  provide() {
    return {
      [serviceApi]: new FirebaseServiceApi('koncert'),
      [bus]: eventBus,
    };
  },
  mounted() {
    eventBus.$on('error', (error) => {
      console.error(error);
      app.$data['displayContent'] = false;
      app.$data['displayError'] = true;
      app.$data['errorMessage'] = <String>((<Error>error).message);
    });
  }
});
