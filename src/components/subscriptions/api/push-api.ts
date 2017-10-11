import {Artist} from '../../../model/artist';
import {ConcertNotification} from '../../../model/concert-notification';

export interface PushApi {
  saveSubscription(subscriptionId: string, artistId: number): void;
  deleteSubscription(subscriptionId: string, artistId: number): void;
  getSubscriptions(subscriptionId: string): Promise<Artist[]>;
  getNotification(subscriptionId: string): Promise<ConcertNotification>;
}
