import axios from 'axios';
import {HttpPushApi} from '../../../../src/components/subscriptions/api/http-push-api';
import {Artist} from '../../../../src/model/artist';

describe('HttpPushApi', () => {

  it('should perform a get request when querying subscriptions', async () => {
    const artist = new Artist(1, 'Alice', 'alice');
    const resolved = new Promise((r) => r({ data: {subscriptions: [artist]} }));
    const axiosGetMock = jest.fn();
    axiosGetMock.mockReturnValue(resolved);
    axios.get = axiosGetMock;

    const artistsResponse: Artist[] = await new HttpPushApi().getSubscriptions('testSubscriptionId');

    expect(artistsResponse[0]).toBe(artist);
    expect(axiosGetMock).toBeCalledWith(process.env.PUSH_API_URL + HttpPushApi.GET_ENDPOINT + 'testSubscriptionId');
  });

  it('should throw an exception in case of an error get getting subscriptions', async () => {
    axios.get = jest.fn(() => { throw new Error('An error occurred'); });

    let err;
    try {
      await new HttpPushApi().getSubscriptions('testSubscriptionId');
    } catch (e) {
      err = e;
    }
    expect(err.message).toBe('An error occurred');
  });

  it('should perform a save request', async () => {
    const axiosPostMock = jest.fn();
    axiosPostMock.mockReturnValue(new Promise((r) => r({})));
    axios.post = axiosPostMock;
    await new HttpPushApi().saveSubscription('', 1);
    expect(axiosPostMock).toBeCalled();
  });

  it('should throw an exception in case of an error when saving subscriptions', async () => {
    axios.post = jest.fn(() => { throw new Error('A save error occurred'); });

    let err;
    try {
      await new HttpPushApi().saveSubscription('testSubscriptionId', 1);
    } catch (e) {
      err = e;
    }
    expect(err.message).toBe('A save error occurred');
  });

  it('should perform a delete request', async () => {
    const axiosDeleteMock = jest.fn();
    axiosDeleteMock.mockReturnValue(new Promise((r) => r({})));
    axios.delete = axiosDeleteMock;
    await new HttpPushApi().deleteSubscription('testSubscriptionId', 1);
    expect(axiosDeleteMock).toBeCalledWith(process.env.PUSH_API_URL + HttpPushApi.DELETE_ENDPOINT + 'testSubscriptionId' + '/' + 1);
  });
});
