import { GenreFilterComponent } from '../../../src/components/genre_filter/genre_filter';
import {FakeServiceApi} from '../../../src/util/fake-service-api';
import {mount, Wrapper} from 'vue-test-utils';
import Vue from 'vue';

describe('GenreFilter component', () => {

  it('should fetch genres from the ServiceApi', async () => {
    const wrapper: Wrapper<Vue> = mount(GenreFilterComponent, { provide: {serviceApi: new FakeServiceApi()}} );

    let expectedGenres = [];
    await Vue.nextTick(() => {
      expectedGenres = wrapper.vm.$data['genres'];
    });
    expect(expectedGenres.length).toBe(3);
    expect(expectedGenres[0].key).toBe('heavymetal');
  });
});
