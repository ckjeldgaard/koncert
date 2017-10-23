import { expect } from 'chai';
import { ConcertsComponent } from '../../../src/components/concerts/concerts';
import {MockServiceApi} from '../../../src/util/component-test';
import {spy, SinonSpy} from 'sinon';
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
    fakeBus.$emit = busSpy;
  });

  it('should do something', () => {
    const wrapper: Wrapper = mount(ConcertsComponent, {provide: {bus: fakeBus, serviceApi: mockServiceApi} });
    expect(wrapper.vm.$data['concerts']).to.equal(mockServiceApi.concerts);
  });

});
