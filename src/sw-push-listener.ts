import {HttpPushApi} from './components/subscriptions/api/http-push-api';
import {PushNotification} from './components/subscriptions/helpers/push-notification';
import {PushSupportBrowser} from './components/subscriptions/helpers/push-support-browser';
import {ConcertNotification} from './model/concert-notification';

interface ExtendableWindow extends Window {
  registration: ServiceWorkerRegistration;
}

interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

interface Clients {
  openWindow(url: USVString);
}

interface NotificationEvent extends ExtendableEvent {
  action: string;
  notification: Notification;
}

declare const clients: Clients;
let selfWindow: ExtendableWindow = <ExtendableWindow>self;

selfWindow.addEventListener('push', async (event: ExtendableEvent) => {
  event.waitUntil(
    (async() => {
      const subscription: PushSubscription = await selfWindow.registration.pushManager.getSubscription();
      try {
        const notification: ConcertNotification = await new PushNotification(new HttpPushApi(), new PushSupportBrowser()).getNotification(subscription);
        return selfWindow.registration.showNotification(
          notification.title,
          {
            'body': notification.body,
            'icon': '../assets/img/icons/icon-128x128.png',
            'tag': notification.url
          }
        );
      } catch (e) {
        console.error('Error when fetching notification', e);
      }
    })()
  );
});

selfWindow.addEventListener('notificationclick', async (event: NotificationEvent) => {
  console.log('notificationclick', event);
  event.waitUntil(
    clients.openWindow(event.notification.tag)
  );
});
