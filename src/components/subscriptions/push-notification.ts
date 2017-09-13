export class PushNotification {

  constructor() {

  }

  public async isPushSupported() {
    // Check whether the 'push notification' permission is denied by the user
    if ((Notification as any).permission === 'denied') {
      alert('User has blocked push notification.');
      return;
    }

    // Check 'push notification' whether is supported or not
    if (!('PushManager' in window)) {
      alert('Sorry, Push notification isn\'t supported in your browser.');
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    try {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        this.changePushStatus(true);
      }
      else {
        this.changePushStatus(false);
      }
    } catch (error) {
      console.error('Error occurred while enabling push ', error);
    }
  }

  public async subscribePush() {
    const registration = await navigator.serviceWorker.ready;
    if (!registration.pushManager) {
      alert('Your browser doesn\'t support push notification.');
      return false;
    }

    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true // Always show notification when received
      });
      console.info('Push notification subscribed.');
      console.log(subscription);
      this.saveSubscriptionID(subscription);
      this.changePushStatus(true);
    } catch (error) {
      this.changePushStatus(false);
      console.error('Push notification subscription error: ', error);
    }
  }

  public changePushStatus(status: boolean): void {
    console.log('changePushStatus called with', status);
    // TODO Implement
  }

  public async unsubscribePush() {
    const registration = await navigator.serviceWorker.ready;
    try {
      const subscription = await registration.pushManager.getSubscription();
      // If no `push subscription`, then return
      if (!subscription) {
        alert('Unable to unregister push notification.');
        return;
      }

      try {
        await subscription.unsubscribe();
        console.log('Unsubscribed successfully.');
        console.info('Push notification unsubscribed.');
        // TODO: deleteSubscriptionID(subscription);
        this.changePushStatus(false);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error('Failed to unsubscribe push notification.', error);
    }
  }

  public saveSubscriptionID(subscription) {
    const subscriptionId = subscription.endpoint.split('gcm/send/')[1];
    console.log('Subscription ID', subscriptionId);
    // TODO: save subscription via API
  }

}
