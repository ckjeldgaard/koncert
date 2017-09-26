import {Genre} from '../../../src/model/genre';

export class GenreBuilder {

  private key: string;
  private value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  public static create(): GenreBuilder {
    return new GenreBuilder(
      'heavymetal',
      'Heavy metal'
    );
  }

  public withKey(key: string): GenreBuilder {
    return new GenreBuilder(
      key,
      this.value
    );
  }

  public withName(value: string): GenreBuilder {
    return new GenreBuilder(
      this.key,
      value
    );
  }

  public build(): Genre {
    return <Genre>{
      key: this.key,
      value: this.key,
    };
  }

}
