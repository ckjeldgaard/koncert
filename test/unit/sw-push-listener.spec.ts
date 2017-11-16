const makeServiceWorkerEnv = require('service-worker-mock');

interface Window {
  trigger?: any;
  listeners?: any;
}
declare var window: Window;

describe('Service Worker push listener', () => {

  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv());
    jest.resetModules();
  });

  it('should add push listener', async () => {
    require('../../src/sw-push-listener');

    await window.trigger('push');
    expect(window.listeners['push']).toBeDefined();
  });

});
