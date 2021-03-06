import {PushNotification} from '../../../../src/components/subscriptions/helpers/push-notification';
import {PushSupport} from '../../../../src/components/subscriptions/helpers/push-support';
import {Artist} from '../../../../src/model/artist';
import {FakePushApi} from '../../util/fake-push-api';
import {PushApi} from '../../../../src/components/subscriptions/api/push-api';

let fakeSubscription: PushSubscription;
let pushSupportStub: PushSupport;

describe('PushNotification', () => {

  beforeEach(() => {
    fakeSubscription = <PushSubscription> {
      endpoint: <USVString> 'gcm/send/fakeSubscriptionId'
    };
    pushSupportStub = <PushSupport>{
      getNotificationPermission: () => { return 'denied'; },
      isPushManagerSupported: () => { return false; },
      getServiceWorkerRegistration: () => {
        return new Promise<ServiceWorkerRegistration>((resolve) => {
          resolve( <ServiceWorkerRegistration> {
            pushManager: <PushManager>{
              getSubscription: () => { return new Promise<PushSubscription>((resolve) => {
                resolve(fakeSubscription);
              }); }
            },
          });
        });
      }
    };
  });

  it('should throw an error if permission is denied', async () => {
    let err;
    try {
      await new PushNotification(new FakePushApi(), pushSupportStub).isPushSupported();
    } catch (e) {
      err = e;
    }
    expect(err.message).toBe('Push notifications are blocked.');
  });

  it('should throw an error if push notifications are not supported in browser', async () => {
    let err;
    try {
      pushSupportStub.getNotificationPermission =  () => { return 'granted'; };
      await new PushNotification(new FakePushApi(), pushSupportStub).isPushSupported();
    } catch (e) {
      err = e;
    }
    expect(err.message).toBe('Sorry, Push notifications aren\'t supported in your browser.');
  });

  it('should get a service worker registration', async () => {
    pushSupportStub.getNotificationPermission =  () => { return 'granted'; };
    pushSupportStub.isPushManagerSupported =  () => { return true; };

    const pushSubscription = await new PushNotification(new FakePushApi(), pushSupportStub).isPushSupported();
    expect(pushSubscription).toBe(fakeSubscription);
  });

  it('should return false if no service worker registration', async () => {
    pushSupportStub.getNotificationPermission =  () => { return 'granted'; };
    pushSupportStub.isPushManagerSupported =  () => { return true; };
    fakeSubscription = null;

    const returnValue = await new PushNotification(new FakePushApi(), pushSupportStub).isPushSupported();
    expect(returnValue).toBeFalsy();
  });

  it('should throw an error if no push manager when subscribing', async () => {
    let err;
    try {
      pushSupportStub.getServiceWorkerRegistration =  () => {
        return new Promise<ServiceWorkerRegistration>((resolve) => {
          resolve( <ServiceWorkerRegistration> {
            pushManager: null
          });
        });
      };
      await new PushNotification(new FakePushApi(), pushSupportStub).subscribePush();
    } catch (e) {
      err = e;
    }
    expect(err.message).toBe('Your browser doesn\'t support push notifications.');
  });

  it('should subscribe', async () => {
    pushSupportStub.getServiceWorkerRegistration =  () => {
      return new Promise<ServiceWorkerRegistration>((resolve) => {
        resolve( <ServiceWorkerRegistration> {
          pushManager: <PushManager>{
            subscribe: () => {
              return new Promise<PushSubscription>((resolve) => {
                resolve(fakeSubscription);
              });
            }
          },
        });
      });
    };
    const pushSubscription: PushSubscription = await new PushNotification(new FakePushApi(), pushSupportStub).subscribePush();
    expect(pushSubscription).toBe(fakeSubscription);
  });

  it('should throw an error if subscription is not possible', async () => {
    let err;
    try {
      pushSupportStub.getServiceWorkerRegistration =  () => {
        return new Promise<ServiceWorkerRegistration>((resolve) => {
          resolve( <ServiceWorkerRegistration> {
            pushManager: <PushManager>{
              subscribe: () => {
                return new Promise<PushSubscription>((resolve, reject) => {
                  reject(new Error('Cannot subscribe to push notifications'));
                });
              }
            },
          });
        });
      };
      await new PushNotification(new FakePushApi(), pushSupportStub).subscribePush();
    } catch (e) {
      err = e;
    }
    expect(err.message).toBe('Cannot subscribe to push notifications');
  });

  it('should unsubscribe', async () => {
    fakeSubscription.unsubscribe = () => {
      return new Promise<boolean>((resolve) => {
        resolve(true);
      });
    };
    const unsubscribed: boolean = await new PushNotification(new FakePushApi(), pushSupportStub).unsubscribePush();
    expect(unsubscribed).toBe(true);
  });

  it('should throw an exception in case of unsubscription errors', async () => {
    fakeSubscription.unsubscribe = () => {
      return new Promise<boolean>((resolve, reject) => {
        reject(new Error('Failed to unsubscribe push notification.'));
      });
    };
    let err;
    try {
      await new PushNotification(new FakePushApi(), pushSupportStub).unsubscribePush();
    } catch (e) {
      err = e;
    }
    expect(err.message).toBe('Failed to unsubscribe push notification.');
  });

  it('should save a subscription', async () => {
    const fakePushApi: PushApi = new FakePushApi();
    const pushApiSpy = jest.spyOn(fakePushApi, 'saveSubscription');
    await new PushNotification(fakePushApi, pushSupportStub).saveSubscription(fakeSubscription, new Artist(1, 'Alice', 'alice'));
    expect(pushApiSpy).toBeCalledWith('fakeSubscriptionId', 1);
  });

  it('should delete a subscription', async () => {
    const fakePushApi: PushApi = new FakePushApi();
    const pushApiSpy = jest.spyOn(fakePushApi, 'deleteSubscription');
    await new PushNotification(fakePushApi, pushSupportStub).deleteSubscription(fakeSubscription, new Artist(1, 'Alice', 'alice'));
    expect(pushApiSpy).toBeCalledWith('fakeSubscriptionId', 1);
  });

});
