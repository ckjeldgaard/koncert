import {FirebaseServiceApi} from '../../../src/data/firebase-service-api';
import * as firebase from 'firebase';
import {ServiceCallback} from '../../../src/data/servic-callback';

describe('FirebaseServiceApi', () => {

  let serviceCallback: ServiceCallback;
  let mockStorage: Storage;

  beforeEach(() => {
    serviceCallback = {
      onLoaded: (data) => {
        console.log('onLoaded');
      },
      onError: (exception) => {
        console.error('onError', exception);
      },
    };
    let MockStorage = jest.fn<Storage>(() => ({
      setItem: jest.fn()
    }));
    mockStorage = new MockStorage();
  });

  it('should get concerts', () => {

    const spy = jest.spyOn(serviceCallback, 'onLoaded');

    const returnValue = [{'name': 'Artistname'}];
    let Snapshot = jest.fn<firebase.database.DataSnapshot>(() => ({
      val: jest.fn().mockReturnValue(returnValue)
    }));
    const MockDatabase = jest.fn<firebase.database.Database>(() => ({
      ref: jest.fn<firebase.database.Reference>(() => ({
        orderByChild: jest.fn<firebase.database.Reference>(() => ({
          startAt: jest.fn<firebase.database.Reference>(() => ({
            on: jest.fn((eventType, callback) => {
              callback(
                new Snapshot()
              );
            })
          }))
        }))
      }))
    }));

    new FirebaseServiceApi(
      new MockDatabase(),
      mockStorage
    ).getConcerts(serviceCallback, 1);

    expect(spy).toBeCalledWith(returnValue);
  });
});
