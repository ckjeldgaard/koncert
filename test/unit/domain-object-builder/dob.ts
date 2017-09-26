import {ConcertBuilder} from './concert-builder';
import {GenreBuilder} from './genre-builder';

export class DomainObjectBuilder {

  public static aNew(): DomainObjectBuilder {
    return new DomainObjectBuilder();
  }

  public concert(): ConcertBuilder {
    return ConcertBuilder.create();
  }

  public genre(): GenreBuilder {
    return GenreBuilder.create();
  }


}
