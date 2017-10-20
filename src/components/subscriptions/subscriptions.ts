import Vue from 'vue';
import Component from 'vue-class-component';
import { mixin as onClickOutside } from 'vue-on-click-outside';
import {ServiceApi} from '../../data/service-api';
import {Inject} from 'vue-property-decorator';
import {Artist} from '../../model/artist';
import {PushNotification} from './helpers/push-notification';
import {HttpPushApi} from './api/http-push-api';
import {PushSupportBrowser} from './helpers/push-support-browser';

@Component({
  template: require('./subscriptions.html'),
  mixins: [onClickOutside],
})
export class SubscriptionsComponent extends Vue {

  public buttonDisabled = true;
  public artistsSearchResult: Artist[] = [];
  public errorMessage: string = '';
  public currentSubscriptions: Artist[] = [];

  private selectedArtist: Artist;
  private searchField: HTMLInputElement;
  private pushNotification: PushNotification;
  private subscription: PushSubscription;

  @Inject() serviceApi: ServiceApi;
  @Inject() bus: Vue;

  mounted() {
    this.searchField = this.$refs['search'] as HTMLInputElement;

  }

  async created() {
    this.pushNotification = new PushNotification(new HttpPushApi(), new PushSupportBrowser());
    try {
      const subscription = await this.pushNotification.isPushSupported();
      if (!subscription) {
        await this.handleSubscription();
      } else {
        this.subscription = <PushSubscription>subscription;
      }

      console.log('subscription = ', this.subscription);

      this.updateCurrentSubscriptions();
    } catch (e) {
      console.error(e);
      this.errorMessage = e.message;
    }
  }

  private async updateCurrentSubscriptions(): Promise<void> {
    this.currentSubscriptions = await this.pushNotification.getCurrentSubscriptions(this.subscription);
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

  public addSelectedClick(event): boolean {
    this.addSelected();
    return false;
  }

  private async addSelected() {
    try {
      await this.pushNotification.saveSubscription(this.subscription, this.selectedArtist);

      this.updateCurrentSubscriptions();
    } catch (e) {
      this.errorMessage = e.message;
    }
  }

  public async deleteSubscription(artist: Artist) {
    try {
      await this.pushNotification.deleteSubscription(this.subscription, artist);
      this.updateCurrentSubscriptions();
    } catch (e) {
      this.errorMessage = e.message;
    }
  }

  private async handleSubscription() {
    try {
      this.subscription = await this.pushNotification.subscribePush();
    } catch (e) {
      console.error(e);
      this.errorMessage = e.toString();
    }
  }

  public close(): void {
    this.artistsSearchResult = [];
    this.searchField.value = '';
  }
}
