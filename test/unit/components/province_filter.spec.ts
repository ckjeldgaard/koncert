import { ProvinceFilterComponent } from '../../../src/components/province_filter/province_filter';
import {MockServiceApi} from '../../../src/util/component-test';
import {spy} from 'sinon';
import {mount, Wrapper} from 'vue-test-utils';
import Vue from 'vue';

describe('ProvinceFilter component', () => {

  it('should fetch provinces from the ServiceApi', async () => {
    const serviceSpy = spy();
    const wrapper: Wrapper<Vue> = mount(ProvinceFilterComponent, { provide: {serviceApi: new MockServiceApi(serviceSpy)}} );

    let expectedGenres = [];
    await Vue.nextTick(() => {
      expectedGenres = wrapper.vm.$data['provinces'];
    });
    expect(expectedGenres.length).toBe(4);
    expect(expectedGenres[0].key).toBe('all');
  });
});
