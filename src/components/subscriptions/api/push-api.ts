import {Artist} from '../../../model/artist';

export interface PushApi {
  saveSubscription(subscriptionId: string, artistId: number): void;
  deleteSubscription(subscriptionId: string, artistId: number): void;
  getSubscriptions(subscriptionId: string): Promise<Artist[]>;
}
