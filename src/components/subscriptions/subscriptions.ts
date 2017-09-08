import Vue from 'vue';
import Component from 'vue-class-component';
import {ServiceApi} from '../../data/service-api';
import {serviceApi, bus} from '../../util/constants';
import {Inject} from 'vue-property-decorator';

@Component({
  template: require('./subscriptions.html')
})
export class SubscriptionsComponent extends Vue {

  public artistsSearchResult = [];

  @Inject(serviceApi) serviceApi: ServiceApi;
  @Inject(bus) bus: Vue;

  public search(searchQuery: string) {
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
}
