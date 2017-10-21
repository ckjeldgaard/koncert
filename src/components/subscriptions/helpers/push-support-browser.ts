import {PushSupport} from './push-support';

export class PushSupportBrowser implements PushSupport {

  getNotificationPermission(): string {
    return (Notification as any).permission;
  }

  isPushManagerSupported(): boolean {
    return ('PushManager' in window);
  }

  async getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration> {
    return await navigator.serviceWorker.ready;
  }
}
