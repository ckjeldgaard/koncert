import {FirebaseServiceApi} from '../../../src/data/firebase-service-api';
import {ServiceCallback} from '../../../src/data/servic-callback';
import {DomainObjectBuilder} from '../domain-object-builder/dob';

describe('FirebaseServiceApi', () => {

  let serviceCallback: ServiceCallback;
  let mockStorage: Storage;
  let navigator: NavigatorOnLine;

  beforeEach(() => {
    serviceCallback = {
      onLoaded: (data) => {},
      onError: (exception) => {
        console.error('onError', exception);
      },
    };
    let MockStorage = jest.fn<Storage>(() => ({
      setItem: jest.fn(),
      getItem: jest.fn().mockReturnValue(null)
    }));
    mockStorage = new MockStorage();
    navigator = <NavigatorOnLine>{onLine: true};
  });

  it('should get concerts', () => {
    const spy = jest.spyOn(serviceCallback, 'onLoaded');
    const returnValue: object = [{'name': 'Artistname'}];
    new FirebaseServiceApi(
      DomainObjectBuilder.aNew().database().withReturnValue(returnValue).withQueries(['orderByChild', 'startAt']).build(),
      mockStorage,
      navigator
    ).getConcerts(serviceCallback, 1);

    expect(spy).toBeCalledWith(returnValue);
  });

  it('should get concerts from local storage when offline', () => {
    const spy = jest.spyOn(serviceCallback, 'onError');
    let offlineNavigator = <NavigatorOnLine>{
      onLine: false
    };

    new FirebaseServiceApi(
      DomainObjectBuilder.aNew().database().build(),
      mockStorage,
      offlineNavigator
    ).getConcerts(serviceCallback, 1);

    expect(spy).toBeCalled();
  });

  it('should get provinces', () => {
    const spy = jest.spyOn(serviceCallback, 'onLoaded');
    const returnValue: object = [{'name': 'Province name'}];
    new FirebaseServiceApi(
      DomainObjectBuilder.aNew().database().withReturnValue(returnValue).build(),
      mockStorage,
      navigator
    ).getProvinces(serviceCallback);

    expect(spy).toBeCalledWith(returnValue);
  });

  it('should get genres', () => {
    const spy = jest.spyOn(serviceCallback, 'onLoaded');
    const returnValue: object = [{'name': 'Genre'}];
    new FirebaseServiceApi(
      DomainObjectBuilder.aNew().database().withReturnValue(returnValue).build(),
      mockStorage,
      navigator
    ).getGenres(serviceCallback);

    expect(spy).toBeCalledWith(returnValue);
  });

  it('should search artists', () => {
    const spy = jest.spyOn(serviceCallback, 'onLoaded');
    const returnValue: object = [{'id': 'Search result'}];
    new FirebaseServiceApi(
      DomainObjectBuilder.aNew().database().withReturnValue(returnValue).withQueries(['orderByChild', 'limitToFirst', 'startAt', 'endAt']).build(),
      mockStorage,
      navigator
    ).searchArtists(serviceCallback, 'searchQuery');

    expect(spy).toBeCalledWith(returnValue);
  });
});
