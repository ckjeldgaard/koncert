
export interface PushSupport {
  getNotificationPermission(): string;
  isPushManagerSupported(): boolean;
}
