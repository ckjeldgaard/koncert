import {PushApi} from '../api/push-api';
import {PushSupport} from './push-support';
import {Artist} from '../../../model/artist';
import {ConcertNotification} from '../../../model/concert-notification';

export class PushNotification {

  private static readonly LOCALSTORAGE_SUBSCRIPTIONS_KEY = 'subscriptions';

  private readonly pushApi: PushApi;
  private readonly pushSupport: PushSupport;

  constructor(pushApi: PushApi, pushSupport: PushSupport) {
    this.pushApi = pushApi;
    this.pushSupport = pushSupport;
  }

  public notificationPermission(): string {
    return this.pushSupport.getNotificationPermission();
  }

  public async isPushSupported(): Promise<PushSubscription | boolean> {
    // Check whether the 'push notification' permission is denied by the user
    if (this.notificationPermission() === 'denied') {
      throw new Error('Push notifications are blocked.');
    }

    // Check whether 'push notification' is supported or not
    if (!this.pushSupport.isPushManagerSupported()) {
      throw new Error('Sorry, Push notifications aren\'t supported in your browser.');
    }

    const registration = await this.pushSupport.getServiceWorkerRegistration();
    try {
      const subscription: PushSubscription = await registration.pushManager.getSubscription();
      return (subscription) ? subscription : Promise.resolve(false);
    } catch (error) {
      console.error('Error occurred while enabling push ', error);
      throw error;
    }
  }

  public async subscribePush(): Promise<PushSubscription> {
    const registration = await this.pushSupport.getServiceWorkerRegistration();
    if (!registration.pushManager) {
      throw new Error('Your browser doesn\'t support push notifications.');
    }

    try {
      return await registration.pushManager.subscribe({
        userVisibleOnly: true // Always show notification when received
      });
    } catch (error) {
      console.error('Push notification subscription error: ', error);
      throw error;
    }
  }

  public async unsubscribePush(): Promise<boolean> {
    const registration = await this.pushSupport.getServiceWorkerRegistration();
    try {
      const subscription = await registration.pushManager.getSubscription();
      return await subscription.unsubscribe();
    } catch (error) {
      console.error('Failed to unsubscribe push notification.', error);
      throw error;
    }
  }

  public async saveSubscription(subscription: PushSubscription, artist: Artist): Promise<void> {
    await this.pushApi.saveSubscription(this.subscriptionId(subscription), artist.id);
  }

  public async getCurrentSubscriptions(subscription: PushSubscription): Promise<Artist[]> {
    return await this.pushApi.getSubscriptions(this.subscriptionId(subscription));
  }

  public async getNotification(subscription: PushSubscription): Promise<ConcertNotification> {
    return await this.pushApi.getNotification(this.subscriptionId(subscription));
  }

  public async deleteSubscription(subscription: PushSubscription, artist: Artist): Promise<void> {
    await this.pushApi.deleteSubscription(this.subscriptionId(subscription), artist.id);
  }

  private subscriptionId(subscription: PushSubscription): string {
    return subscription.endpoint.split('gcm/send/')[1];
  }

}
