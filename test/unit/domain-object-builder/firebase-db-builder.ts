import * as firebase from 'firebase';
import Database = firebase.database.Database;
import DataSnapshot = firebase.database.DataSnapshot;

export class FirebaseDbBuilder {

  constructor(private readonly returnValue: object, private readonly queries: string[]) {}

  public static create(): FirebaseDbBuilder {
    return new FirebaseDbBuilder(
      [{'name': 'Artistname'}],
      []
    );
  }

  public withReturnValue(json: object): FirebaseDbBuilder {
    return new FirebaseDbBuilder(
      json,
      this.queries
    );
  }

  public withQueries(queries: string[]): FirebaseDbBuilder {
    return new FirebaseDbBuilder(
      this.returnValue,
      queries
    );
  }

  public build(): Database {
    let referenceQueries: object = {
      on: jest.fn((eventType, callback) => {
        callback(this.snapshot());
      })
    };
    for (const query of this.queries.reverse()) {
      referenceQueries = this.chain(referenceQueries, query);
    }

    const MockDatabase = jest.fn<firebase.database.Database>(() => ({
      ref: jest.fn<firebase.database.Reference>(() => (
        referenceQueries
      ))
    }));
    return new MockDatabase();
  }

  private snapshot(): DataSnapshot {
    let Snapshot = jest.fn<firebase.database.DataSnapshot>(() => ({
      val: jest.fn().mockReturnValue(this.returnValue)
    }));
    return new Snapshot();
  }

  private chain(referenceToDecorate: object, queryName: string): object {
    let reference = {};
    reference[queryName] = jest.fn<firebase.database.Reference>(() => (
      referenceToDecorate
    ));
    return reference;
  }

}
