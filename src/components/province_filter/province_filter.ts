import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
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
      this.serviceApi.getProvinces({
        onLoaded: (data) => {
          this.updateProvinces(data);
        },
        onError: (exception) => {
          console.error('An error occurred.', exception);
        },
      });
    });
  }

  private updateProvinces(provinceData: any) {
    this.provinces = [];
    this.provinces.push(new Province('all', 'All provinces'));
    for (let key in provinceData) {
      this.provinces.push(new Province(key, provinceData[key]));
    }
  }
}
