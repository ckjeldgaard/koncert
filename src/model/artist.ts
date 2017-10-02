export class Artist {
  public readonly id: number;
  public readonly name: string;
  public readonly lowercase: string;

  constructor(id: number, name: string, lowercase: string) {
    this.id = id;
    this.name = name;
    this.lowercase = lowercase;
  }
}
