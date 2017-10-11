// import {PushSupportBrowser} from './components/subscriptions/helpers/push-support-browser';

interface ExtendableWindow extends Window {
  registration: ServiceWorkerRegistration;
}

interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

let thisself: ExtendableWindow = <ExtendableWindow>self;

thisself.addEventListener('push', async (event: ExtendableEvent) => {

  console.info('Event: Push ', event);

  let title = 'New concert';

  let body = {
    'body': 'Click to see the concert',
    'tag': 'pwa',
    'icon': './assets/img/icons/icon-128x128.png'
  };

  /*
  const registration: ServiceWorkerRegistration = await new PushSupportBrowser().getServiceWorkerRegistration();
  registration.showNotification(title, body);
  */

  event.waitUntil(
    thisself.registration.showNotification(title, body)
  );

});
