import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
import {Month} from '../../model/month';
import {ConcertSplit} from '../../util/concert-split';
import {ServiceApi} from '../../data/service-api';
import {serviceApi, bus} from '../../util/constants';

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

    window.addEventListener('scroll', this.updateFixedHeaders);
  }

  destroyed() {
    window.removeEventListener('scroll', this.updateFixedHeaders);
  }

  private updateFixedHeaders(): void {
    const fixedAreas = this.$el.querySelectorAll('.concerts .fixed-area');
    for (let i = 0, len = fixedAreas.length; i < len; i++) {

      const el: Element = fixedAreas[i];
      const offsetTop: number = el.getBoundingClientRect().top + document.body.scrollTop;
      const scrollTop: number = document.body.scrollTop;
      const floatingHeader: HTMLElement = <HTMLElement>fixedAreas[i].querySelector('.floating-header');

      if ((scrollTop > offsetTop) && (scrollTop < offsetTop + el.getBoundingClientRect().height)) {
        floatingHeader.style.visibility = 'visible';
      } else {
        floatingHeader.style.visibility = 'hidden';
      }
    }
  }

  private updateConcerts(province?: string) {
    const concertSplit: ConcertSplit = new ConcertSplit(this.concerts);
    this.months = (province != null && province !== 'all') ? concertSplit.splitByMonths(province) : concertSplit.splitByMonths();
    this.loaded = true;

    this.$nextTick(() => {
      const fixedAreas = this.$el.querySelectorAll('.concerts .fixed-area');
      let clonedHeaderRow;

      for (let i = 0, len = fixedAreas.length; i < len; i++) {
        clonedHeaderRow = fixedAreas[i].querySelector('.subtitle');
        clonedHeaderRow.parentNode.insertBefore(
          clonedHeaderRow.cloneNode(true),
          clonedHeaderRow
        );
        this.addClass(clonedHeaderRow, 'floating-header');
      }
    });
  }

  private addClass(el: HTMLElement, className: string) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }
}
