import {PushApi} from '../../../src/components/subscriptions/api/push-api';
import {Artist} from '../../../src/model/artist';
import {ConcertNotification} from '../../../src/model/concert-notification';

export class FakePushApi implements PushApi {

  constructor() {
  }

  saveSubscription(subscriptionId: string, artistId: number) {
  }

  deleteSubscription(subscriptionId: string, artistId: number) {
  }

  getSubscriptions(subscriptionId: string): Promise<Artist[]> {
    let subscriptions: Artist[] = [];
    return new Promise((resolve, reject) => {
      resolve(subscriptions);
    });
  }

  getNotification(subscriptionId: string): Promise<ConcertNotification> {
    return new Promise((resolve, reject) => {
      resolve(new ConcertNotification('title', 'body', 'url'));
    });
  }
}
