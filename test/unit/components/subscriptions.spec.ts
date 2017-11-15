import {mount, Wrapper} from 'vue-test-utils';
import {SubscriptionsComponent} from '../../../src/components/subscriptions/subscriptions';
import {FakeServiceApi} from '../../../src/util/fake-service-api';
import {PushNotification} from '../../../src/components/subscriptions/helpers/push-notification';
import {FakePushApi} from '../util/fake-push-api';
import {PushSupport} from '../../../src/components/subscriptions/helpers/push-support';
import Vue from 'vue';

let fakeSubscription: PushSubscription;
let pushSupportStub: PushSupport;

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
    const wrapper: Wrapper<Vue> = mount(SubscriptionsComponent, { provide: {serviceApi: new FakeServiceApi()}});

    const searchInput: Wrapper<Vue> = wrapper.findAll('input').at(1);
    (<HTMLInputElement>searchInput.element).disabled = false;
    (<HTMLInputElement>searchInput.element).value = 'searchArtist';
    searchInput.trigger('input');

    expect(wrapper.vm.$data['artistsSearchResult']).toBe(FakeServiceApi.testArtists);
    expect(wrapper.find('.search-input > ul').html()).toBe('<ul><li>Alice</li><li>Bob</li></ul>');
  });

  it('should select an artist', async () => {
    const wrapper: Wrapper<Vue> = mount(SubscriptionsComponent, { provide: {serviceApi: new FakeServiceApi()}});

    const searchInput: Wrapper<Vue> = wrapper.findAll('input').at(1);
    (<HTMLInputElement>searchInput.element).disabled = false;
    (<HTMLInputElement>searchInput.element).value = 'searchArtist';
    searchInput.trigger('input');

    // Select first artist option in dropdown:
    const option = wrapper.find('.search-input > ul > li');
    option.trigger('click');

    expect(wrapper.vm.$data['buttonDisabled']).toBeFalsy();
    expect((<HTMLInputElement>wrapper.findAll('input').at(1).element).value).toBe('Alice');
  });

  it('should set UI according to current subscription', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    push.isPushSupported = jest.fn().mockReturnValue(fakeSubscription);

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {pushNotification: push}});

    expect(wrapper.vm.$data['pushEnabled']).toBeTruthy();
  });

  /*
  Currently fails:
  it('should display an error if push notifications are blocked by the user.', async () => {
    const push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {pushNotification: push}});
    expect(wrapper.vm.$data['errorMessage']).toBe('Push notifications are blocked.');
  });
  */

  it('should add subscription for an artist', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    push.isPushSupported = jest.fn().mockReturnValue(fakeSubscription);
    const saveSpy = jest.spyOn(push, 'saveSubscription');

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {serviceApi: new FakeServiceApi(), pushNotification: push}});

    const searchInput: Wrapper<Vue> = wrapper.findAll('input').at(1);
    (<HTMLInputElement>searchInput.element).disabled = false;
    (<HTMLInputElement>searchInput.element).value = 'searchArtist';
    searchInput.trigger('input');

    // Select first artist option in dropdown and click add button:
    wrapper.find('.search-input > ul > li').trigger('click');
    wrapper.find('button').trigger('click');

    expect(saveSpy).toBeCalled();
    expect(saveSpy).toBeCalledWith(fakeSubscription, FakeServiceApi.testArtists[0]);
  });

  it('should delete subscription for an artist', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    push.isPushSupported = jest.fn().mockReturnValue(fakeSubscription);
    const deleteSpy = jest.spyOn(push, 'deleteSubscription');

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {serviceApi: new FakeServiceApi(), pushNotification: push}});
    wrapper.setData({currentSubscriptions: FakeServiceApi.testArtists});
    wrapper.find('.subscriptions-list > li > button').trigger('click');

    expect(deleteSpy).toBeCalled();
    expect(deleteSpy).toBeCalledWith(fakeSubscription, FakeServiceApi.testArtists[0]);
  });

  it('should change permissions', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    const subscribeSpy = jest.spyOn(push, 'subscribePush');

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {serviceApi: new FakeServiceApi(), pushNotification: push}});
    wrapper.setData({pushEnabled: true});
    wrapper.find('input').trigger('change');

    expect(subscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe for push notifications', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    window.confirm = jest.fn().mockReturnValue(true);
    const unsubscribeSpy = jest.spyOn(push, 'unsubscribePush');

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {serviceApi: new FakeServiceApi(), pushNotification: push}});
    wrapper.setData({pushEnabled: false});
    wrapper.find('input').trigger('change');

    expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('should not unsubscribe for push notifications if user cancels confirm dialog', async () => {
    let push: PushNotification = new PushNotification(new FakePushApi(), pushSupportStub);
    window.confirm = jest.fn().mockReturnValue(false);
    const unsubscribeSpy = jest.spyOn(push, 'unsubscribePush');

    let wrapper: Wrapper<Vue> = await mount(SubscriptionsComponent, {provide: {serviceApi: new FakeServiceApi(), pushNotification: push}});
    wrapper.setData({pushEnabled: false});
    wrapper.find('input').trigger('change');

    expect(unsubscribeSpy).toHaveBeenCalledTimes(0);
  });
});
