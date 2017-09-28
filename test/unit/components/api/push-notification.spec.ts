import { expect } from 'chai';
import {PushNotification} from '../../../../src/components/subscriptions/helpers/push-notification';
import {PushApi} from '../../../../src/components/subscriptions/api/push-api';
import {PushSupport} from '../../../../src/components/subscriptions/helpers/push-support';

class FakePushApi implements PushApi {
  saveSubscription(subscriptionId: string, artistId: number) {
  }

  deleteSubscription(subscriptionId: string, artistId: number) {
  }
}

let pushSupportStub = <PushSupport>{
  getNotificationPermission: () => { return 'denied'; },
  isPushManagerSupported: () => { return false; }
};

describe('PushNotification', () => {
  it('should throw an error if permission is denied', async () => {
    let err;
    try {
      await new PushNotification(new FakePushApi(), pushSupportStub).isPushSupported();
    } catch (e) {
      err = e;
    }
    expect(err.message).to.equal('Push notifications are blocked.');
  });

});
