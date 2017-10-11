import {PushApi} from './push-api';
import axios, {AxiosResponse} from 'axios';
import {Artist} from '../../../model/artist';
import {ConcertNotification} from '../../../model/concert-notification';

export class HttpPushApi implements PushApi {

  public static readonly SAVE_ENDPOINT: string = 'firebase/api/add';
  public static readonly GET_ENDPOINT: string = 'firebase/api/get/';
  public static readonly DELETE_ENDPOINT: string = 'firebase/api/delete/';
  public static readonly NOTIFICATION_ENDPOINT: string = 'firebase/api/notification/';

  public async saveSubscription(subscriptionId: string, artistId: number) {

    const params = new URLSearchParams();
    params.append('subscription_id', subscriptionId);
    params.append('artist_id', artistId.toString());

    try {
      const response: AxiosResponse = await axios.post(process.env.PUSH_API_URL + HttpPushApi.SAVE_ENDPOINT, params);
      console.log('response', response);
    } catch (e) {
      throw e;
    }
  }

  public async deleteSubscription(subscriptionId: string, artistId: number) {
    await axios.delete(process.env.PUSH_API_URL + HttpPushApi.DELETE_ENDPOINT + subscriptionId + '/' + artistId);
  }

  public async getSubscriptions(subscriptionId: string): Promise<Artist[]> {
    let subscriptions: Artist[] = [];
    try {
      const response: AxiosResponse = await axios.get(process.env.PUSH_API_URL + HttpPushApi.GET_ENDPOINT + subscriptionId);
      for (let key in response.data.subscriptions) {
        subscriptions.push(<Artist>response.data.subscriptions[key]);
      }
      return subscriptions;
    } catch (e) {
      throw e;
    }
  }

  public async getNotification(subscriptionId: string): Promise<ConcertNotification> {
    const url: string = process.env.PUSH_API_URL + HttpPushApi.NOTIFICATION_ENDPOINT + subscriptionId;
    const response = await fetch(url);
    const data = await response.json();
    return new ConcertNotification(data.notification.title, data.notification.body);
  }
}
