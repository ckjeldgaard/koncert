export class ConcertNotification {
  public readonly title: string;
  public readonly body: string;
  public readonly url: string;

  constructor(title: string, body: string, url: string) {
    this.title = title;
    this.body = body;
    this.url = url;
  }
}
