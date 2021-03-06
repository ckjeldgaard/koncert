import Vue from 'vue';
import Component from 'vue-class-component';
import { mixin as onClickOutside } from 'vue-on-click-outside';
import {ServiceApi} from '../../data/service-api';
import {Inject} from 'vue-property-decorator';
import {Artist} from '../../model/artist';
import {PushNotification} from './helpers/push-notification';
import {isUndefined} from 'util';

@Component({
  template: require('./subscriptions.html'),
  mixins: [onClickOutside],
})
export class SubscriptionsComponent extends Vue {

  public pushEnabled = false;
  public buttonDisabled = true;
  public artistsSearchResult: Artist[] = [];
  public errorMessage: string = '';
  public currentSubscriptions: Artist[] = [];

  private selectedArtist: Artist;
  private searchField: HTMLInputElement;
  private subscription: PushSubscription;

  @Inject() pushNotification: PushNotification;
  @Inject() serviceApi: ServiceApi;
  @Inject() bus: Vue;

  async mounted() {
    this.searchField = this.$refs['search'] as HTMLInputElement;
    try {
      const subscription = await this.pushNotification.isPushSupported();
      if (subscription !== false) {
        this.subscription = <PushSubscription>subscription;
        this.pushEnabled = true;
        await this.updateCurrentSubscriptions();
      }
    } catch (e) {
      this.errorMessage = e.message;
    }
  }

  public async changePermission(event) {
    if (this.pushEnabled) {
      try {
        this.subscription = await this.pushNotification.subscribePush();
        this.updateCurrentSubscriptions();
      } catch (e) {
        this.pushEnabled = false;
        this.errorMessage = e.message;
      }
    } else {
      if (confirm('Are you sure you want to disable push notifications?')) {
        this.pushNotification.unsubscribePush();
        this.subscription = null;
        this.currentSubscriptions = [];
      } else {
        this.pushEnabled = true;
      }
    }
  }

  private async updateCurrentSubscriptions(): Promise<void> {
    if (!isUndefined(this.subscription)) {
      console.log('updateCurrentSubscriptions');
      this.currentSubscriptions = await this.pushNotification.getCurrentSubscriptions(this.subscription);
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

  public close(): void {
    this.artistsSearchResult = [];
    this.searchField.value = '';
  }
}
