import Vue from 'vue';
import Component from 'vue-class-component';
import {ServiceApi} from '../../data/service-api';
import {Inject} from 'vue-property-decorator';
import {Genre} from '../../model/genre';

@Component({
  template: require('./genre_filter.html')
  // template: '<div class="genres g--12"><multiselect :id="\'genres\'" :options="genres" :placeholder="\'Genres\'" :multiple="true" /></div>'
})
export class GenreFilterComponent extends Vue {

  @Inject() serviceApi: ServiceApi;
  @Inject() bus: Vue;

  public genres: Genre[] = [];

  public mounted() {

    this.$nextTick(() => {
      this.serviceApi.getGenres({
        onLoaded: (data) => {
          this.updateGenres(data);
        },
        onError: (exception) => {
          console.error('An error occurred.', exception);
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
