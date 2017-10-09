import { expect } from 'chai';
import axios from 'axios';
import sinon from 'sinon';
import {HttpPushApi} from '../../../../src/components/subscriptions/api/http-push-api';
import {Artist} from '../../../../src/model/artist';

describe('HttpPushApi', () => {

  let sandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('should perform a get request when querying subscriptions', async () => {
    const artist = new Artist(1, 'Alice', 'alice');
    const resolved = new Promise((r) => r({ data: {subscriptions: [artist]} }));
    sandbox.stub(axios, 'get').returns(resolved);

    const pushApi: HttpPushApi = new HttpPushApi();
    const artistsResponse: Artist[] = await pushApi.getSubscriptions('');

    expect(artistsResponse[0]).to.equal(artist);
  });
});
