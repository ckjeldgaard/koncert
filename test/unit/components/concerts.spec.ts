import { ConcertsComponent } from '../../../src/components/concerts/concerts';
import {MockServiceApi} from '../../../src/util/component-test';
import {mount, Wrapper} from 'vue-test-utils';
import Vue from 'vue';
import SpyInstance = jest.SpyInstance;
import {Province} from '../../../src/model/Province';

const mockServiceApi: MockServiceApi = new MockServiceApi();

describe('Concerts component', () => {

  let fakeBus: Vue;
  let busSpy: SpyInstance;
  beforeEach(() => {
    fakeBus = new Vue();
    busSpy = jest.spyOn(fakeBus, '$on');
  });

  it('should display concerts on initial load', () => {
    const wrapper: Wrapper<Vue> = mount(ConcertsComponent, {provide: {bus: fakeBus, serviceApi: mockServiceApi} });
    expect(wrapper.vm.$data['concerts']).toBe(mockServiceApi.concerts);
  });


  it('should update the concerts list when a province is selected', () => {
    const wrapper: Wrapper<Vue> = mount(ConcertsComponent, {provide: {bus: fakeBus, serviceApi: mockServiceApi} });
    wrapper.vm['bus'].$emit('province', [new Province('koebenhavn', 'København')]);

    expect(busSpy).toBeCalled();
    for (let month of wrapper.vm.$data['months']) {
      for (let concert of month.concerts) {
        expect(concert.province).toBe('koebenhavn');
      }
    }
  });

});
