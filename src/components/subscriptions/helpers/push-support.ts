
export interface PushSupport {
  getNotificationPermission(): string;
  isPushManagerSupported(): boolean;
  getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration>;
}
