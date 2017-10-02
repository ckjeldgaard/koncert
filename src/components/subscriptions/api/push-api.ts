import {Artist} from '../../../model/artist';

export interface PushApi {
  saveSubscription(subscriptionId: string, artistId: number);
  deleteSubscription(subscriptionId: string, artistId: number);
  getSubscriptions(subscriptionId: string): Promise<Artist[]>;
}
