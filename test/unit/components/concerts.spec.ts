import { expect } from 'chai';
import { ConcertsComponent } from '../../../src/components/concerts/concerts';
import {MockServiceApi} from '../../../src/util/component-test';
import {spy, assert, SinonSpy} from 'sinon';
import {mount, Wrapper} from 'avoriaz';
import Vue from 'vue';

const serviceSpy = spy();
const mockServiceApi: MockServiceApi = new MockServiceApi(serviceSpy);

describe('Concerts component', () => {

  let fakeBus: Vue;
  let busSpy: SinonSpy;
  beforeEach(() => {
    busSpy = spy();
    fakeBus = new Vue();
    fakeBus.$on = busSpy;
  });

  it('should display concerts on initial load', () => {
    const wrapper: Wrapper = mount(ConcertsComponent, {provide: {bus: fakeBus, serviceApi: mockServiceApi} });
    expect(wrapper.vm.$data['concerts']).to.equal(mockServiceApi.concerts);
  });

  /*
  it('should update the concerts list when a province is selected', () => {
    const wrapper: Wrapper = mount(ConcertsComponent, {provide: {bus: fakeBus, serviceApi: mockServiceApi} });
    // wrapper.vm['bus'].$emit('province', 'koebenhavn');
    assert.called(busSpy);
    expect(1).to.equal(2);
  });
  */

});
