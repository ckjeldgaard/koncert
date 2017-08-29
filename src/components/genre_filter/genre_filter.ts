import Vue from 'vue';
import Component from 'vue-class-component';
import {ServiceApi} from '../../data/service-api';
import {serviceApi, bus} from '../../util/constants';
import {Inject} from 'vue-property-decorator';
import {Genre} from '../../model/genre';
import {SelectOption} from '../../model/select-option';

@Component({
  template: require('./genre_filter.html')
})
export class GenreFilterComponent extends Vue {

  @Inject(serviceApi) serviceApi: ServiceApi;
  @Inject(bus) bus: Vue;

  public genres: Genre[] = [];
  public ops: SelectOption[] = [];

  public created() {
    this.ops.push(new SelectOption('safari', 'Safari'));
    this.ops.push(new SelectOption('firefox', 'Firefox'));
    this.ops.push(new SelectOption('chrome', 'Chrome'));
    this.ops.push(new SelectOption('internet-explorer', 'Internet Explorer'));
    this.ops.push(new SelectOption('opera', 'Opera'));
    this.ops.push(new SelectOption('konqueror', 'Konqueror'));
    this.ops.push(new SelectOption('mosaic', 'Mosaic'));
    this.ops.push(new SelectOption('seamonkey', 'Seamonkey'));
  }

  public mounted() {

    this.$nextTick(() => {
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

  public onChangeGenre(e) {
    this.bus.$emit('genre-key', e.target.value);
  }

  private updateGenres(genreData: any) {
    for (let key in genreData) {
      this.genres.push(new Genre(key, genreData[key]));
    }
  }
}
