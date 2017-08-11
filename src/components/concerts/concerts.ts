import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
import {Month} from '../../model/month';
import {ConcertSplit} from '../../util/concert-split';
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

  private concerts: any;
  public months: Month[] = [];
  public loaded: boolean = false;
  public selectedConcert: Concert = null;

  mounted() {
    this.$nextTick(() => {
      this.serviceApi.getConcerts({
        onLoaded: (data) => {
          this.concerts = data;
          this.updateConcerts();
        },
        onError: (exception) => {
          console.log('An error occurred.', exception);
        },
      }, this.currentTime);
    });
  }

  created() {
    this.bus.$on('province-key', (id) => this.updateConcerts(id));
  }

  private updateConcerts(province?: string) {
    const concertSplit: ConcertSplit = new ConcertSplit(this.concerts);
    this.months = (province != null && province !== 'all') ? concertSplit.splitByMonths(province) : concertSplit.splitByMonths();
    this.loaded = true;
  }

  public info(event, concert) {
    this.selectedConcert = concert;

    // let dialogScrollable = new mdc.dialog.MDCDialog(document.querySelector('#mdc-dialog-with-list'));

    // dialogScrollable.lastFocusedTarget = event.target;
    // dialogScrollable.show();
  }
}
