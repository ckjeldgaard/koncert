import {PushApi} from './push-api';
import axios, {AxiosResponse} from 'axios';
import {Artist} from '../../../model/artist';

export class HttpPushApi implements PushApi {

  private readonly SAVE_ENDPOINT: string = 'firebase/api/add';
  private readonly GET_ENDPOINT: string = 'firebase/api/get/';

  async saveSubscription(subscriptionId: string, artistId: number) {

    const params = new URLSearchParams();
    params.append('subscription_id', subscriptionId);
    params.append('artist_id', artistId.toString());

    try {
      const response: AxiosResponse = await axios.post(process.env.PUSH_API_URL + this.SAVE_ENDPOINT, params);
      console.log('response', response);
    } catch (e) {
      console.error('An error occurred while saving', e);
      throw e;
    }
  }

  deleteSubscription(subscriptionId: string, artistId: number) {
  }

  async getSubscriptions(subscriptionId: string): Promise<Artist[]> {
    let subscriptions: Artist[] = [];
    try {
      const response: AxiosResponse = await axios.get(process.env.PUSH_API_URL + this.GET_ENDPOINT + subscriptionId);
      console.log('response', response.data.subscriptions);
      for (let key in response.data.subscriptions) {

        subscriptions.push(<Artist>response.data.subscriptions[key]);
        // data[key].id = key;
        // subscriptions.push(data[key]);
      }

      return subscriptions;
    } catch (e) {
      console.error('An error occurred while getting subscriptions', e);
      throw e;
    }
  }
}
