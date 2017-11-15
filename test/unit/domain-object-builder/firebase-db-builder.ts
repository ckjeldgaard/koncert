import * as firebase from 'firebase';
import Database = firebase.database.Database;

export class FirebaseDbBuilder {

  constructor(private readonly returnValue: object) {}

  public static create(): FirebaseDbBuilder {
    return new FirebaseDbBuilder(
      [{'name': 'Artistname'}]
    );
  }

  public withReturnValue(json: object): FirebaseDbBuilder {
    return new FirebaseDbBuilder(
      json
    );
  }

  public build(): Database {

    let queries = ['orderByChild', 'startAt'];
    let refQueries: object = {};
    refQueries = {
      on: jest.fn((eventType, callback) => {
        callback(
          new Snapshot()
        );
      })
    };
    
    let Snapshot = jest.fn<firebase.database.DataSnapshot>(() => ({
      val: jest.fn().mockReturnValue(this.returnValue)
    }));
    const MockDatabase = jest.fn<firebase.database.Database>(() => ({
      ref: jest.fn<firebase.database.Reference>(() => ({
        orderByChild: jest.fn<firebase.database.Reference>(() => ({
          startAt: jest.fn<firebase.database.Reference>(() => (
            refQueries
          ))
        }))
      }))
    }));

    return new MockDatabase();
  }

}
