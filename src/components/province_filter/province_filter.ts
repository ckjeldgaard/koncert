import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
import {MDCSelect, MDCSelectFoundation} from '@material/select';
import {ServiceApi} from '../../data/service-api';
import {serviceApi, bus} from '../../util/constants';
import {Province} from '../../model/Province';

@Component({
  template: require('./province_filter.html')
})
export class ProvinceFilterComponent extends Vue {

  @Inject(serviceApi) serviceApi: ServiceApi;
  @Inject(bus) bus: Vue;

  public provinces: Province[] = [];

  public mounted() {
    this.$nextTick(() => {

      const select = new MDCSelect(this.$refs.provincefilter);
      select.listen('MDCSelect:change', () => {
        this.bus.$emit('province-key', select.value);
        console.log('Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ' + 'with value "${select.value}"');
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
      this.provinces.push(new Province(key, provinceData[key]));
    }
  }
}
