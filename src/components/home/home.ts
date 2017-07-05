import Vue from 'vue';
import Component from 'vue-class-component';
import {ConcertsComponent} from '../concerts/concerts';
import {ProvinceFilterComponent} from '../province_filter/province_filter';

@Component({
    template: require('./home.html')
})
export class HomeComponent extends Vue {

  homeName: string = 'Koncert';

  components: {
    'concerts': ConcertsComponent,
    'province_filter': ProvinceFilterComponent
  };

}
