import {ConcertBuilder} from '../concert-builder';

export class DomainObjectBuilder {

  public static aNew(): DomainObjectBuilder {
    return new DomainObjectBuilder();
  }

  public concert(): ConcertBuilder {
    return ConcertBuilder.create();
  }
}
