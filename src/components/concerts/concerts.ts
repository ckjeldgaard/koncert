import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
import {Month} from '../../model/month';
import {EventSplit} from '../../util/event-split';
import {ServiceApi} from '../../data/service-api';
import {serviceApi, bus} from '../../util/constants';

@Component({
  template: require('./concerts.html')
})
export class ConcertsComponent extends Vue {

  @Inject(serviceApi) serviceApi: ServiceApi;
  @Inject(bus) bus: Vue;

  private readonly currentTime = new Date().getTime() / 1000;

  private events: any;
  public months: Month[] = [];
  public loaded: boolean = false;

  mounted() {
    this.$nextTick(() => {
      this.serviceApi.getConcerts({
        onLoaded: (data) => {
          this.events = data;
          this.updateEvents(data);
        },
        onError: (exception) => {
          console.log('An error occurred.', exception);
        },
      }, this.currentTime);
    });
  }

  created() {
    this.bus.$on('province-key', (id) => this.filterByProvince(id));
  }

  private filterByProvince(province: string) {
    let tmpEvents: Event[] = [];
      for (const i in this.events) {
        if (this.events[i].province === province) {
          tmpEvents.push(this.events[i]);
        }
      }
    this.updateEvents(tmpEvents);
  }

  private updateEvents(eventData: any) {
    this.months = new EventSplit(eventData).splitByMonths();
    this.loaded = true;
  }
}
