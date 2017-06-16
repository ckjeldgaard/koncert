export interface ServiceCallback {
  onLoaded(data: any);
  onError(exception: Error);
}
