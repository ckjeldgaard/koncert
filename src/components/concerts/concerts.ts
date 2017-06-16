import Vue from 'vue';
import Component from 'vue-class-component';
import {Month} from '../../model/month';
import {EventSplit} from '../../util/event-split';
import {FirebaseServiceApi} from '../../data/firebase-service-api';
import {ServiceApi} from '../../data/service-api';

@Component({
  template: require('./concerts.html')
})
export class ConcertsComponent extends Vue {

  private readonly currentTime = new Date().getTime() / 1000;

  protected serviceApi: ServiceApi = new FirebaseServiceApi();
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
