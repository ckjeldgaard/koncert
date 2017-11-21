import { ProvinceFilterComponent } from '../../../src/components/province_filter/province_filter';
import {FakeServiceApi} from '../../../src/util/fake-service-api';
import {mount, Wrapper} from 'vue-test-utils';
import Vue from 'vue';
import SpyInstance = jest.SpyInstance;

describe('ProvinceFilter component', () => {

  const COPENHAGEN_LATITUDE: number = 55.69873390000001;
  const COPENHAGEN_LONGITUDE: number = 12.597520999999999;

  let fakeBus: Vue;
  let busSpy: SpyInstance;
  beforeEach(() => {
    fakeBus = new Vue();
    busSpy = jest.spyOn(fakeBus, '$emit');
  });

  afterEach(() => {
    busSpy.mockReset();
    busSpy.mockRestore();
  });

  it('should fetch provinces from the ServiceApi', async () => {
    const wrapper: Wrapper<Vue> = mount(ProvinceFilterComponent, { provide: {serviceApi: new FakeServiceApi(), bus: fakeBus, navigator: jest.fn()}} );

    let expectedGenres = [];
    await Vue.nextTick(() => {
      expectedGenres = wrapper.vm.$data['provinces'];
    });
    expect(expectedGenres.length).toBe(4);
    expect(expectedGenres[0].key).toBe('all');
  });

  it('should set province to the one the user is located in', async () => {
    const MockGeoLocation = jest.fn<Geolocation>(() => ({
      getCurrentPosition: jest.fn((successCallback: PositionCallback) => {
        successCallback(<Position>{
            coords: <Coordinates>{
              latitude: COPENHAGEN_LATITUDE,
              longitude: COPENHAGEN_LONGITUDE
            }
          }
        );
      })
    }));
    const MockNavigator = jest.fn<NavigatorGeolocation>(() => ({
      geolocation: new MockGeoLocation()
    }));

    mount(ProvinceFilterComponent, { provide: {serviceApi: new FakeServiceApi(), bus: fakeBus, navigator: new MockNavigator()}} );

    await Vue.nextTick(() => {
      expect(busSpy).toHaveBeenCalled();
      expect(busSpy).toBeCalledWith('selectOption', 'koebenhavn');
    });
  });
});
