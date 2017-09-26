import {PushApi} from './push-api';
import axios, {AxiosResponse, AxiosInstance} from 'axios';

export class HttpPushApi implements PushApi {

  private readonly SAVE_ENDPOINT: string = 'firebase/api/add';
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.PUSH_API_URL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
  }

  async saveSubscription(subscriptionId: string, artistId: number) {

    const params = new URLSearchParams();
    params.append('subscription_id', subscriptionId);
    params.append('artist_id', artistId.toString());

    try {
      const response: AxiosResponse = await axios.post(process.env.PUSH_API_URL + this.SAVE_ENDPOINT, params);
      console.log('response', response);
  } catch (e) {
    console.error('An error occurred while saving', e);
  }
  }

  deleteSubscription(subscriptionId: string, artistId: number) {
  }

}
