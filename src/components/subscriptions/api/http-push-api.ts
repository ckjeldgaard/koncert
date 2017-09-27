import {PushApi} from './push-api';
import axios, {AxiosResponse, AxiosInstance} from 'axios';

export class HttpPushApi implements PushApi {

  private readonly SAVE_ENDPOINT: string = 'firebase/api/add';

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

}
