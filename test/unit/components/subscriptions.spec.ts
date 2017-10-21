import { expect } from 'chai';
import {mount, Wrapper} from 'avoriaz';
import {SubscriptionsComponent} from '../../../src/components/subscriptions/subscriptions';
import {MockServiceApi} from '../../../src/util/component-test';
import {spy} from 'sinon';
import {PushNotification} from '../../../src/components/subscriptions/helpers/push-notification';
import {FakePushApi} from '../util/fake-push-api';
import {PushSupport} from '../../../src/components/subscriptions/helpers/push-support';

let pushSupportStub: PushSupport;

describe('Subscriptions component', () => {

  beforeEach(() => {
    pushSupportStub = <PushSupport>{
      getNotificationPermission: () => { return 'denied'; },
      isPushManagerSupported: () => { return false; }
    };
  });

  it('should search an artist', async () => {
    const wrapper: Wrapper = mount(SubscriptionsComponent, { provide: {serviceApi: new MockServiceApi(spy())}});

    const searchInput: Wrapper = wrapper.find('input')[1];
    (<HTMLInputElement>searchInput.element).disabled = false;
    (<HTMLInputElement>searchInput.element).value = 'searchArtist';
    searchInput.trigger('input');

    expect(wrapper.vm.$data['artistsSearchResult']).to.equal(MockServiceApi.testArtists);
    expect(wrapper.find('.search-input > ul')[0].html()).to.equal('<ul><li>Alice</li><li>Bob</li></ul>');
  });

  it('should select an artist', async () => {
    const wrapper: Wrapper = mount(SubscriptionsComponent, { provide: {serviceApi: new MockServiceApi(spy())}});

    const searchInput: Wrapper = wrapper.find('input')[1];
    (<HTMLInputElement>searchInput.element).disabled = false;
    (<HTMLInputElement>searchInput.element).value = 'searchArtist';
    searchInput.trigger('input');

    // Select first artist option in dropdown:
    const option = wrapper.find('.search-input > ul > li')[0];
    option.trigger('click');

    expect(wrapper.vm.$data['buttonDisabled']).to.be.false;
    expect((<HTMLInputElement>wrapper.find('input')[1].element).value).to.equal('Alice');
  });

  it('should display an error in push notifications are blocked by the user.', async () => {
    const push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    let wrapper: Wrapper = await mount(SubscriptionsComponent, {provide: {pushNotification: push}});
    expect(wrapper.vm.$data['errorMessage']).to.equal('Push notifications are blocked.');
  });
});
