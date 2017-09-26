import { expect } from 'chai';
import { GenreFilterComponent } from './genre_filter';
import {MockServiceApi} from '../../util/component-test';
import {spy, assert, SinonSpy} from 'sinon';
import {mount, Wrapper} from 'avoriaz';
import Vue from 'vue';

const setServiceApi = (wrapper: Wrapper, serviceSpy: SinonSpy): void => {
  wrapper.vm.$data['serviceApi'] = new MockServiceApi(serviceSpy);
};

describe('GenreFilter component', () => {

  it('should fetch genres from the ServiceApi', async () => {
    const serviceSpy = spy();
    const wrapper: Wrapper = mount(GenreFilterComponent);
    setServiceApi(wrapper, serviceSpy);

    let expectedGenres = [];
    await Vue.nextTick(() => {
      expectedGenres = wrapper.vm.$data['genres'];
    });
    expect(expectedGenres.length).to.equal(3);
  });
});
