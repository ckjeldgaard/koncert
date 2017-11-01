import {PushApi} from '../../../src/components/subscriptions/api/push-api';
import {SinonSpy} from 'sinon';
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
    return undefined;
  }

  getNotification(subscriptionId: string): Promise<ConcertNotification> {
    return undefined;
  }
}
