import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
import {Month} from '../../model/month';
import {ConcertSplit} from '../../util/concert-split';
import {ServiceApi} from '../../data/service-api';
import {serviceApi, bus} from '../../util/constants';
import {CriteriaProvince} from '../../util/criteria/criteria-province';
import {Concert} from '../../model/concert';
import {CriteriaGenre} from '../../util/criteria/criteria-genre';
import {AndCriteria} from '../../util/criteria/and-criteria';

@Component({
  template: require('./concerts.html')
})
export class ConcertsComponent extends Vue {

  @Inject(serviceApi) serviceApi: ServiceApi;
  @Inject(bus) bus: Vue;

  private readonly currentTime = new Date().getTime() / 1000;

  private concerts: Concert[] = [];
  public months: Month[] = [];
  public loaded: boolean = false;

  private selectedProvince: string;
  private selectedGenre: string;

  mounted() {
    this.$nextTick(() => {
      this.serviceApi.getConcerts({
        onLoaded: (data) => {
          for (let key in data) {
            data[key].id = key;
            this.concerts.push(data[key]);
          }
          this.updateConcerts();
        },
        onError: (exception) => {
          console.log('An error occurred.', exception);
        },
      }, this.currentTime);
    });
  }

  created() {
    this.bus.$on('province-key', (id) => {
      this.selectedProvince = id;
      this.updateConcerts();
    });
    this.bus.$on('genre-key', (id) => {
      this.selectedGenre = id;
      this.updateConcerts();
    });

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

  private updateConcerts() {

    let filteredConcerts: Concert[] = [];
    if (this.selectedProvince != null && this.selectedProvince !== 'all' && (this.selectedGenre == null || this.selectedGenre === 'all')) {
      // Only province
      filteredConcerts = new CriteriaProvince(this.selectedProvince).meetCriteria(this.concerts);
    } else if (this.selectedGenre != null && this.selectedGenre !== 'all' && (this.selectedProvince == null || this.selectedProvince === 'all')) {
      // Only genre
      filteredConcerts = new CriteriaGenre(this.selectedGenre).meetCriteria(this.concerts);
    } else if (this.selectedProvince != null && this.selectedProvince !== 'all' && this.selectedGenre != null && this.selectedGenre !== 'all') {
      // Both province and genre
      filteredConcerts = new AndCriteria(
        new CriteriaProvince(this.selectedProvince),
        new CriteriaGenre(this.selectedGenre)
      ).meetCriteria(this.concerts);
    } else {
      // No filter
      filteredConcerts = this.concerts;
    }

    const concertSplit: ConcertSplit = new ConcertSplit(filteredConcerts);

    this.months = concertSplit.splitByMonths();
    this.loaded = true;

    // Fixed month headers:
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
