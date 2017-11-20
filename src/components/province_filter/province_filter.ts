import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
import {ServiceApi} from '../../data/service-api';
import {Province} from '../../model/Province';
import {GeoPoint} from '../../util/region/geo-point';
import {ProvincePreSelection} from '../../util/region/province-pre-selection';

@Component({
  template: require('./province_filter.html')
})
export class ProvinceFilterComponent extends Vue {

  @Inject() serviceApi: ServiceApi;
  @Inject() bus: Vue;
  @Inject() navigator: NavigatorGeolocation;

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
    this.getUserPosition();
  }

  private getUserPosition() {
    if (this.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.preSelectPosition);
    }
  }

  private preSelectPosition(position: Position) {
    this.bus.$emit(
      'selectOption',
      new ProvincePreSelection(new GeoPoint(position.coords.latitude, position.coords.longitude), this.provinces).getPreSelection()
    );
  }
}
