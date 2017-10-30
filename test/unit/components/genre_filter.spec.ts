import { GenreFilterComponent } from '../../../src/components/genre_filter/genre_filter';
import {MockServiceApi} from '../../../src/util/component-test';
import {spy} from 'sinon';
import {mount, Wrapper} from 'vue-test-utils';
import Vue from 'vue';

describe('GenreFilter component', () => {

  it('should fetch genres from the ServiceApi', async () => {
    const serviceSpy = spy();
    const wrapper: Wrapper<Vue> = mount(GenreFilterComponent, { provide: {serviceApi: new MockServiceApi(serviceSpy)}} );

    let expectedGenres = [];
    await Vue.nextTick(() => {
      expectedGenres = wrapper.vm.$data['genres'];
    });
    expect(expectedGenres.length).toBe(3);
    expect(expectedGenres[0].key).toBe('heavymetal');
  });
});
