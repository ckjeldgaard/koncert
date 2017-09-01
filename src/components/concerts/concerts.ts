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
import {Genre} from '../../model/genre';
import {Criteria} from '../../util/criteria/criteria';
import {OrCriteria} from '../../util/criteria/or-criteria';

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
  public selectedGenres: Genre[] = [];

  mounted() {
    this.$nextTick(() => {
      this.serviceApi.getConcerts({
        onLoaded: (data) => {
          this.concerts = data;
          this.updateConcerts();
        },
        onError: (exception) => {
          this.bus.$emit('error', exception);
        },
      }, this.currentTime);
    });
  }

  created() {
    this.bus.$on('province', (id) => {
      this.selectedProvince = id[0].key;
      this.updateConcerts();
    });
    this.bus.$on('genres', (genres) => {
      this.selectedGenres = genres;
      this.updateConcerts();
    });

    window.addEventListener('scroll', this.updateFixedHeaders);
  }

  destroyed() {
    window.removeEventListener('scroll', this.updateFixedHeaders);
  }

  private updateFixedHeaders(): void {
    const fixedAreas = this.$el.querySelectorAll('.concerts .fixed-area');
    const mobileHeaderHeight: number = (window.screen.width <= 520) ? 100 : 0;
    for (let i = 0, len = fixedAreas.length; i < len; i++) {

      const el: Element = fixedAreas[i];
      const offsetTop: number = el.getBoundingClientRect().top + document.body.scrollTop;
      const scrollTop: number = document.body.scrollTop + mobileHeaderHeight;
      const floatingHeader: HTMLElement = <HTMLElement>fixedAreas[i].querySelector('.floating-header');

      if ((scrollTop > offsetTop) && (scrollTop < offsetTop + el.getBoundingClientRect().height)) {
        floatingHeader.style.visibility = 'visible';
      } else {
        floatingHeader.style.visibility = 'hidden';
      }
    }
  }

  private updateConcerts() {
    this.months = new ConcertSplit(
      new AndCriteria(
        new CriteriaProvince(this.selectedProvince),
        this.buildGenreCriteria()
      ).meetCriteria(
        this.concerts
      )
    ).splitByMonths();
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

  private buildGenreCriteria(): Criteria {
    let genreCriteria: Criteria;
    if (this.selectedGenres.length > 1) {
      genreCriteria = new OrCriteria(
        new CriteriaGenre(this.selectedGenres[0].key),
        new CriteriaGenre(this.selectedGenres[1].key)
      );

      let i: number;
      for (i = 2; i < this.selectedGenres.length; i++) {
        genreCriteria = new OrCriteria(
          new CriteriaGenre(this.selectedGenres[i].key),
          genreCriteria
        );
      }
    } else {
      genreCriteria = (this.selectedGenres.length === 1) ? new CriteriaGenre(this.selectedGenres[0].key) : new CriteriaGenre(null);
    }
    return genreCriteria;
  }

  private addClass(el: HTMLElement, className: string) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }
}
