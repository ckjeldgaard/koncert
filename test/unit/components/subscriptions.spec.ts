import { expect } from 'chai';
import {mount, Wrapper} from 'avoriaz';
import {SubscriptionsComponent} from '../../../src/components/subscriptions/subscriptions';
import {MockServiceApi} from '../../../src/util/component-test';
import {spy} from 'sinon';

describe('Subscriptions component', () => {

  it('should search an artist', async () => {
    const wrapper: Wrapper = mount(SubscriptionsComponent, { provide: {serviceApi: new MockServiceApi(spy())}});

    const searchInput: Wrapper = wrapper.find('input')[0];
    (<HTMLInputElement>searchInput.element).value = 'searchArtist';
    searchInput.trigger('input');

    expect(wrapper.vm.$data['artistsSearchResult']).to.equal(MockServiceApi.testArtists);
    expect(wrapper.find('.search-input > ul')[0].html()).to.equal('<ul><li>Alice</li><li>Bob</li></ul>');
  });

  it('should select an artist', async () => {
    const wrapper: Wrapper = mount(SubscriptionsComponent, { provide: {serviceApi: new MockServiceApi(spy())}});

    const searchInput: Wrapper = wrapper.find('input')[0];
    (<HTMLInputElement>searchInput.element).value = 'searchArtist';
    searchInput.trigger('input');

    // Select first artist option in dropdown:
    const option = wrapper.find('.search-input > ul > li')[0];
    option.trigger('click');

    expect(wrapper.vm.$data['buttonDisabled']).to.be.false;
    expect((<HTMLInputElement>wrapper.find('input')[0].element).value).to.equal('Alice');
  });
});
