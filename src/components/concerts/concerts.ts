import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
import {Month} from '../../model/month';
import {ConcertSplit} from '../../util/concert-split';
import {ServiceApi} from '../../data/service-api';
import {Concert} from '../../model/concert';
import {Genre} from '../../model/genre';
import {CriteriaBuilder} from './helpers/criteria_builder';
import {FixedHeaders} from './helpers/fixed_headers';

@Component({
  template: require('./concerts.html')
})
export class ConcertsComponent extends Vue {

  @Inject() serviceApi: ServiceApi;
  @Inject() bus: Vue;

  private readonly currentTime = new Date().getTime() / 1000 - 86400;

  private concerts: Concert[] = [];
  public months: Month[] = [];
  public loaded: boolean = false;

  private searchTerm: string;
  private selectedProvince: string;
  public selectedGenres: Genre[] = [];

  mounted() {
    this.serviceApi.getConcerts({
      onLoaded: (data) => {
        this.concerts = data;
        this.updateConcerts();
      },
      onError: (exception) => {
        this.bus.$emit('error', exception);
      },
    }, this.currentTime);
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
    this.bus.$on('search', (term) => {
      this.searchTerm = term;
      this.updateConcerts();
    });

    window.addEventListener('scroll', () => {
      new FixedHeaders(this.$el.querySelectorAll('.concerts .fixed-area')).updateFixedHeaders();
    });
  }

  destroyed() {
    window.removeEventListener('scroll', () => {
      new FixedHeaders(this.$el.querySelectorAll('.concerts .fixed-area')).updateFixedHeaders();
    });
  }

  private updateConcerts() {
    this.months = new ConcertSplit(
      new CriteriaBuilder(
        this.searchTerm,
        this.selectedProvince,
        this.selectedGenres
      ).build()
        .meetCriteria(
          this.concerts
        )
    ).splitByMonths();
    this.loaded = true;

    // Fixed month headers:
    this.$nextTick(() => {
      new FixedHeaders(this.$el.querySelectorAll('.concerts .fixed-area')).cloneHeaderRow();
    });
  }
}
