export class Artist {
  public readonly key: string;
  public readonly name: string;
  public readonly lowercase: string;

  constructor(key: string, name: string, lowercase: string) {
    this.key = key;
    this.name = name;
    this.lowercase = lowercase;
  }
}
