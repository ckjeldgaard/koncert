import Vue from 'vue';
import Component from 'vue-class-component';
import { mixin as onClickOutside } from 'vue-on-click-outside';
import {ServiceApi} from '../../data/service-api';
import {Inject} from 'vue-property-decorator';
import {Artist} from '../../model/artist';
import {PushNotification} from './push-notification';
import {HttpPushApi} from './api/http-push-api';

@Component({
  template: require('./subscriptions.html'),
  mixins: [onClickOutside],
})
export class SubscriptionsComponent extends Vue {

  public buttonDisabled = true;
  public artistsSearchResult: Artist[] = [];
  public errorMessage: string = '';

  private selectedArtist: Artist;
  private searchField: HTMLInputElement;
  private pushNotification: PushNotification;

  @Inject() serviceApi: ServiceApi;
  @Inject() bus: Vue;

  mounted() {
    this.searchField = this.$refs['search'] as HTMLInputElement;
  }

  async created() {
    this.pushNotification = new PushNotification(new HttpPushApi());
    try {
      const subscription = await this.pushNotification.isPushSupported();
      if (!subscription) {
        await this.handleSubscription();
      }

      console.log('subscription = ', subscription);
      this.pushNotification.saveSubscriptionID((<PushSubscription>subscription));

    } catch (e) {
      this.errorMessage = e.toString();
      console.error('Error occurred: ', e);
    }
  }

  private async handleSubscription() {
    try {
      await this.pushNotification.subscribePush();
    } catch (e) {
      this.errorMessage = e.toString();
      console.error('Error occurred: ', e);
    }
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
