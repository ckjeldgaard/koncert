export class Month {
  name: string;
  events: Event[];

  constructor(name: string, events: Event[]) {
    this.name = name;
    this.events = events;
  }
}
