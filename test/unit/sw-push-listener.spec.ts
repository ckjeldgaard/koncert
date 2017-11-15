const makeServiceWorkerEnv = require('service-worker-mock');

describe('Service Worker push listener', () => {

  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv());
    jest.resetModules();
  });

  it('should add push listener', async () => {
    require('../../src/sw-push-listener');

    await self.trigger('push');
    expect(self.listeners['push']).toBeDefined();
  });

});
