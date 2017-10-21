import {PushApi} from '../../../src/components/subscriptions/api/push-api';
import {SinonSpy} from 'sinon';
import {Artist} from '../../../src/model/artist';
import {ConcertNotification} from '../../../src/model/concert-notification';

export class FakePushApi implements PushApi {

  private readonly apiSpy: SinonSpy;

  constructor(spy?: SinonSpy) {
    this.apiSpy = spy;
  }

  saveSubscription(subscriptionId: string, artistId: number) {
    this.apiSpy(subscriptionId, artistId);
  }

  deleteSubscription(subscriptionId: string, artistId: number) {
    this.apiSpy(subscriptionId, artistId);
  }

  getSubscriptions(subscriptionId: string): Promise<Artist[]> {
    return undefined;
  }

  getNotification(subscriptionId: string): Promise<ConcertNotification> {
    return undefined;
  }
}
