import {ConcertBuilder} from './concert-builder';
import {GenreBuilder} from './genre-builder';
import {FirebaseDbBuilder} from './firebase-db-builder';

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

  public database(): FirebaseDbBuilder {
    return FirebaseDbBuilder.create();
  }
}
