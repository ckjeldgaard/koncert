import Vue from 'vue';
import Component from 'vue-class-component';
import {ServiceApi} from '../../data/service-api';
import {serviceApi, bus} from '../../util/constants';
import {MDCSelect, MDCSelectFoundation} from '@material/select';
import {Inject} from 'vue-property-decorator';
import {Genre} from '../../model/genre';

@Component({
  template: require('./genre_filter.html')
})
export class GenreFilterComponent extends Vue {

  @Inject(serviceApi) serviceApi: ServiceApi;

  public genres: Genre[] = [];

  public mounted() {
    this.$nextTick(() => {

      const select = new MDCSelect(this.$refs.genrefilter);
      select.listen('MDCSelect:change', () => {
        // this.bus.$emit('province-key', select.value);
        console.log('Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ' + 'with value "${select.value}"');
      });

      this.serviceApi.getGenres({
        onLoaded: (data) => {
          this.updateGenres(data);
        },
        onError: (exception) => {
          console.log('An error occurred.', exception);
        },
      });
    });
  }

  private updateGenres(genreData: any) {
    for (let key in genreData) {
      this.genres.push(new Genre(key, genreData[key]));
    }
  }
}
