
export interface PushApi {
  saveSubscription(subscriptionId: string, artistId: number);
  deleteSubscription(subscriptionId: string, artistId: number);
}
