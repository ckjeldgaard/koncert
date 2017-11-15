import {FirebaseServiceApi} from '../../../src/data/firebase-service-api';
import {ServiceCallback} from '../../../src/data/servic-callback';
import {DomainObjectBuilder} from '../domain-object-builder/dob';

describe('FirebaseServiceApi', () => {

  let serviceCallback: ServiceCallback;
  let mockStorage: Storage;

  beforeEach(() => {
    serviceCallback = {
      onLoaded: (data) => {},
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
    const returnValue: object = [{'name': 'Artistname'}];
    new FirebaseServiceApi(
      DomainObjectBuilder.aNew().database().withReturnValue(returnValue).build(),
      mockStorage
    ).getConcerts(serviceCallback, 1);

    expect(spy).toBeCalledWith(returnValue);
  });

  it('should get provinces', () => {
    const spy = jest.spyOn(serviceCallback, 'onLoaded');
    const returnValue: object = [{'name': 'Artistname'}];
    new FirebaseServiceApi(
      DomainObjectBuilder.aNew().database().withReturnValue(returnValue).build(),
      mockStorage
    ).getProvinces(serviceCallback);

    expect(spy).toBeCalledWith(returnValue);
  });
});
