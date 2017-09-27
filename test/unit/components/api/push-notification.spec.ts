import { expect } from 'chai';
import {PushNotification} from '../../../../src/components/subscriptions/push-notification';
import {PushApi} from '../../../../src/components/subscriptions/api/push-api';

class FakePushApi implements PushApi {
  saveSubscription(subscriptionId: string, artistId: number) {
  }

  deleteSubscription(subscriptionId: string, artistId: number) {
  }
}

describe('PushNotification', () => {
  it('should throw an error if permission is denied', async () => {
    let err;
    try {
      await new PushNotification(new FakePushApi()).isPushSupported();
    } catch (e) {
      err = e;
    }
    expect(err.message).to.equal('Push notifications are blocked.');
  });
});
