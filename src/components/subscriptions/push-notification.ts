import {PushApi} from './api/push-api';

export class PushNotification {

  private readonly pushApi: PushApi;

  constructor(pushApi: PushApi) {
    this.pushApi = pushApi;
  }

  public async isPushSupported(): Promise<PushSubscription | boolean> {
    // Check whether the 'push notification' permission is denied by the user
    if ((Notification as any).permission === 'denied') {
      throw new Error('Push notifications are blocked.');
    }

    // Check whether 'push notification' is supported or not
    if (!('PushManager' in window)) {
      throw new Error('Sorry, Push notifications aren\'t supported in your browser.');
    }

    const registration = await navigator.serviceWorker.ready;
    try {
      const subscription: PushSubscription = await registration.pushManager.getSubscription();
      return (subscription) ? subscription : Promise.resolve(false);
    } catch (error) {
      console.error('Error occurred while enabling push ', error);
      throw error;
    }
  }

  public async subscribePush() {
    const registration = await navigator.serviceWorker.ready;
    if (!registration.pushManager) {
      throw new Error('Your browser doesn\'t support push notifications.');
    }

    try {
      const subscription: PushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true // Always show notification when received
      });
      console.info('Push notification subscribed.');
      console.log('subscription', subscription);
      // this.saveSubscriptionID(subscription);
    } catch (error) {
      console.error('Push notification subscription error: ', error);
      throw error;
    }
  }

  public async unsubscribePush() {
    const registration = await navigator.serviceWorker.ready;
    try {
      const subscription = await registration.pushManager.getSubscription();

      try {
        await subscription.unsubscribe();
        console.log('Unsubscribed successfully.');
        console.info('Push notification unsubscribed.');
        this.deleteSubscriptionID(subscription);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error('Failed to unsubscribe push notification.', error);
      throw error;
    }
  }

  public saveSubscriptionID(subscription: PushSubscription) {
    const subscriptionId = subscription.endpoint.split('gcm/send/')[1];
    console.log('saveSubscriptionID. Subscription ID = ', subscriptionId);

    this.pushApi.saveSubscription(subscriptionId, 4);

    // TODO: save subscription via API
  }

  public deleteSubscriptionID(subscription) {
    const subscriptionId = subscription.endpoint.split('gcm/send/')[1];
    console.log('deleteSubscriptionID. Subscription ID = ', subscriptionId);
    // TODO: Delete subscription via API
  }

}
