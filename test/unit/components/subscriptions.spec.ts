import { expect } from 'chai';
import {mount, Wrapper} from 'vue-test-utils';
import {SubscriptionsComponent} from '../../../src/components/subscriptions/subscriptions';
import {MockServiceApi} from '../../../src/util/component-test';
import {spy, assert, stub, SinonStub} from 'sinon';
import {PushNotification} from '../../../src/components/subscriptions/helpers/push-notification';
import {FakePushApi} from '../util/fake-push-api';
import {PushSupport} from '../../../src/components/subscriptions/helpers/push-support';
import Vue from 'vue';

let fakeSubscription: PushSubscription;
let pushSupportStub: PushSupport;
let confirmStub: SinonStub = stub(window, 'confirm').returns(true);

describe('Subscriptions component', () => {

  beforeEach(() => {
    fakeSubscription = <PushSubscription> {
      endpoint: <USVString> 'gcm/send/fakeSubscriptionId'
    };
    pushSupportStub = <PushSupport>{
      getNotificationPermission: () => { return 'denied'; },
      isPushManagerSupported: () => { return false; }
    };
  });

  it('should search an artist', async () => {
    const wrapper: Wrapper<Vue> = mount(SubscriptionsComponent, { provide: {serviceApi: new MockServiceApi(spy())}});

    const searchInput: Wrapper<Vue> = wrapper.findAll('input').at(1);
    (<HTMLInputElement>searchInput.element).disabled = false;
    (<HTMLInputElement>searchInput.element).value = 'searchArtist';
    searchInput.trigger('input');

    expect(wrapper.vm.$data['artistsSearchResult']).to.equal(MockServiceApi.testArtists);
    expect(wrapper.find('.search-input > ul').html()).to.equal('<ul><li>Alice</li><li>Bob</li></ul>');
  });

  it('should select an artist', async () => {
    const wrapper: Wrapper<Vue> = mount(SubscriptionsComponent, { provide: {serviceApi: new MockServiceApi(spy())}});

    const searchInput: Wrapper<Vue> = wrapper.findAll('input').at(1);
    (<HTMLInputElement>searchInput.element).disabled = false;
    (<HTMLInputElement>searchInput.element).value = 'searchArtist';
    searchInput.trigger('input');

    // Select first artist option in dropdown:
    const option = wrapper.find('.search-input > ul > li');
    option.trigger('click');

    expect(wrapper.vm.$data['buttonDisabled']).to.be.false;
    expect((<HTMLInputElement>wrapper.findAll('input').at(1).element).value).to.equal('Alice');
  });

  it('should set UI according to current subscription', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    stub(push, 'isPushSupported').returns(fakeSubscription);
    // stub(push, 'getCurrentSubscriptions').returns(MockServiceApi.testArtists);

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {pushNotification: push}});

    expect(wrapper.vm.$data['pushEnabled']).to.be.true;
  });

  /*
  Currently fails in Firefox:
  it('should display an error if push notifications are blocked by the user.', async () => {
    const push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    let wrapper: Wrapper = await mount(SubscriptionsComponent, {provide: {pushNotification: push}});
    expect(wrapper.vm.$data['errorMessage']).to.equal('Push notifications are blocked.');
  }); */

  it('should add subscription for an artist', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    stub(push, 'isPushSupported').returns(fakeSubscription);
    const saveSpy = spy(push, 'saveSubscription');

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {serviceApi: new MockServiceApi(spy()), pushNotification: push}});

    const searchInput: Wrapper<Vue> = wrapper.findAll('input').at(1);
    (<HTMLInputElement>searchInput.element).disabled = false;
    (<HTMLInputElement>searchInput.element).value = 'searchArtist';
    searchInput.trigger('input');

    // Select first artist option in dropdown and click add button:
    wrapper.find('.search-input > ul > li').trigger('click');
    wrapper.find('button').trigger('click');

    assert.calledOnce(saveSpy);
    assert.calledWith(saveSpy, fakeSubscription, MockServiceApi.testArtists[0]);
  });

  it('should delete subscription for an artist', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    stub(push, 'isPushSupported').returns(fakeSubscription);
    const deleteSpy = spy(push, 'deleteSubscription');

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {serviceApi: new MockServiceApi(spy()), pushNotification: push}});
    wrapper.setData({currentSubscriptions: MockServiceApi.testArtists});
    wrapper.find('.subscriptions-list > li > button').trigger('click');

    assert.calledOnce(deleteSpy);
    assert.calledWith(deleteSpy, fakeSubscription, MockServiceApi.testArtists[0]);
  });

  it('should change permissions', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    const subscribeSpy = spy(push, 'subscribePush');

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {serviceApi: new MockServiceApi(spy()), pushNotification: push}});
    wrapper.setData({pushEnabled: true});
    wrapper.find('input').trigger('change');

    assert.calledOnce(subscribeSpy);
  });

  it('should unsubscribe for push notifications', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    confirmStub.returns(true);
    const unsubscribeSpy = spy(push, 'unsubscribePush');

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {serviceApi: new MockServiceApi(spy()), pushNotification: push}});
    wrapper.setData({pushEnabled: false});
    wrapper.find('input').trigger('change');

    assert.calledOnce(unsubscribeSpy);
  });

  it('should not unsubscribe for push notifications if user cancels confirm dialog', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    confirmStub.returns(false);
    const unsubscribeSpy = spy(push, 'unsubscribePush');

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {serviceApi: new MockServiceApi(spy()), pushNotification: push}});
    wrapper.setData({pushEnabled: false});
    wrapper.find('input').trigger('change');

    assert.notCalled(unsubscribeSpy);
  });
});
