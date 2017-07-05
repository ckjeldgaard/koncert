import Vue from 'vue';
import Component from 'vue-class-component';
import {ServiceApi} from '../../data/service-api';
import {FirebaseServiceApi} from '../../data/firebase-service-api';
import {MDCSelect, MDCSelectFoundation} from '@material/select';

@Component({
  template: require('./province_filter.html')
})
export class ProvinceFilterComponent extends Vue {
  protected serviceApi: ServiceApi = new FirebaseServiceApi('province_filter');
  public provinces = [];

  mounted() {
    this.$nextTick(() => {

      const select = new MDCSelect(this.$refs.provincefilter);
      select.listen('MDCSelect:change', () => {
        console.log(`Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ` +
          `with value "${select.value}"`);
      });

      this.serviceApi.getProvinces({
        onLoaded: (data) => {
          this.updateProvinces(data);
        },
        onError: (exception) => {
          console.log('An error occurred.', exception);
        },
      });
    });
  }

  private updateProvinces(provinceData: any) {
    for (let key in provinceData) {
      this.provinces.push(provinceData[key]);
    }
  }
}
