export class Month {
  name: string;
  concerts: Concert[];

  constructor(name: string, concerts: Concert[]) {
    this.name = name;
    this.concerts = concerts;
  }
}
