import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
import {Month} from '../../model/month';
import {EventSplit} from '../../util/event-split';
import {ServiceApi} from '../../data/service-api';
import {serviceApi} from '../../util/constants';

@Component({
  template: require('./concerts.html')
})
export class ConcertsComponent extends Vue {

  @Inject(serviceApi) serviceApi: ServiceApi;
  private readonly currentTime = new Date().getTime() / 1000;

  public months: Month[] = [];

  mounted() {
    this.$nextTick(() => {
      this.serviceApi.getConcerts({
        onLoaded: (data) => {
          this.updateEvents(data);
        },
        onError: (exception) => {
          console.log('An error occurred.', exception);
        },
      }, this.currentTime);
    });
  }

  private updateEvents(eventData: any) {
    this.months = new EventSplit(eventData).splitByMonths();
  }
}
