import Vue from 'vue';
import Component from 'vue-class-component';
import { mixin as onClickOutside } from 'vue-on-click-outside';
import {ServiceApi} from '../../data/service-api';
import {serviceApi, bus} from '../../util/constants';
import {Inject} from 'vue-property-decorator';
import {Artist} from '../../model/artist';
import {PushNotification} from './push-notification';

@Component({
  template: require('./subscriptions.html'),
  mixins: [onClickOutside],
})
export class SubscriptionsComponent extends Vue {

  public buttonDisabled = true;
  public artistsSearchResult: Artist[] = [];

  private selectedArtist: Artist;
  private searchField: HTMLInputElement;

  @Inject(serviceApi) serviceApi: ServiceApi;
  @Inject(bus) bus: Vue;

  mounted() {
    this.searchField = this.$refs['search'] as HTMLInputElement;
  }

  created() {
    // let notification: PushNotification = new PushNotification();
    // notification.isPushSupported();
    // notification.subscribePush();
  }

  public search(searchQuery: string) {
    this.buttonDisabled = true;
    if (searchQuery.length > 1) {
      this.serviceApi.searchArtists({
        onLoaded: (data) => {
          this.artistsSearchResult = data;
        },
        onError: (exception) => {
          this.bus.$emit('error', exception);
        },
      }, searchQuery);
    } else {
      this.artistsSearchResult = [];
    }
  }

  public select(artist: Artist): void {
    this.selectedArtist = artist;
    this.buttonDisabled = false;
    this.searchField.value = artist.name;
    this.artistsSearchResult = [];
  }

  public addSelected(): void {
    console.log('ADD SELECTED', this.selectedArtist);
  }

  public close(): void {
    this.artistsSearchResult = [];
    this.searchField.value = '';
  }
}
