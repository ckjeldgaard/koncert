import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
import {Month} from '../../model/month';
import {EventSplit} from '../../util/event-split';
import {ServiceApi} from '../../data/service-api';
import {serviceApi, bus} from '../../util/constants';
import * as mdc from 'material-components-web';

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
  public selectedEvent: Event = null;

  mounted() {
    this.$nextTick(() => {
      this.serviceApi.getConcerts({
        onLoaded: (data) => {
          this.events = data;
          this.updateEvents();
        },
        onError: (exception) => {
          console.log('An error occurred.', exception);
        },
      }, this.currentTime);
    });
  }

  created() {
    this.bus.$on('province-key', (id) => this.updateEvents(id));
  }

  private updateEvents(province?: string) {
    const eventSplit: EventSplit = new EventSplit(this.events);
    this.months = (province != null && province !== 'all') ? eventSplit.splitByMonths(province) : eventSplit.splitByMonths();
    this.loaded = true;
  }

  public info(event, concert) {
    this.selectedEvent = concert;

    let dialogScrollable = new mdc.dialog.MDCDialog(document.querySelector('#mdc-dialog-with-list'));

    dialogScrollable.lastFocusedTarget = event.target;
    dialogScrollable.show();
  }
}
