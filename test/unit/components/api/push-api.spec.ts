import { expect } from 'chai';
import axios from 'axios';
import sinon, {assert, SinonStub} from 'sinon';
import {HttpPushApi} from '../../../../src/components/subscriptions/api/http-push-api';
import {Artist} from '../../../../src/model/artist';

describe('HttpPushApi', () => {

  let sandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('should perform a get request when querying subscriptions', async () => {
    const artist = new Artist(1, 'Alice', 'alice');
    const resolved = new Promise((r) => r({ data: {subscriptions: [artist]} }));
    const stub: SinonStub = sandbox.stub(axios, 'get').returns(resolved);

    const artistsResponse: Artist[] = await new HttpPushApi().getSubscriptions('testSubscriptionId');

    expect(artistsResponse[0]).to.equal(artist);
    assert.calledWith(stub, process.env.PUSH_API_URL + HttpPushApi.GET_ENDPOINT + 'testSubscriptionId');
  });

  it('should throw an exception in case of an error get getting subscriptions', async () => {
    sandbox.stub(axios, 'get').throws(new Error('An error occurred'));

    let err;
    try {
      await new HttpPushApi().getSubscriptions('testSubscriptionId');
    } catch (e) {
      err = e;
    }
    expect(err.message).to.equal('An error occurred');
  });

  it('should perform a save request', async () => {
    const stub: SinonStub = sandbox.stub(axios, 'post').returns(new Promise((r) => r({})));
    await new HttpPushApi().saveSubscription('', 1);
    assert.calledWith(stub, process.env.PUSH_API_URL + HttpPushApi.SAVE_ENDPOINT);
  });

  it('should throw an exception in case of an error when saving subscriptions', async () => {
    sandbox.stub(axios, 'post').throws(new Error('A save error occurred'));

    let err;
    try {
      await new HttpPushApi().saveSubscription('testSubscriptionId', 1);
    } catch (e) {
      err = e;
    }
    expect(err.message).to.equal('A save error occurred');
  });

  it('should perform a delete request', async () => {
    const stub: SinonStub = sandbox.stub(axios, 'delete').returns(new Promise((r) => r({})));
    await new HttpPushApi().deleteSubscription('testSubscriptionId', 1);
    assert.calledWith(stub, process.env.PUSH_API_URL + HttpPushApi.DELETE_ENDPOINT + 'testSubscriptionId' + '/' + 1);
  });
});
