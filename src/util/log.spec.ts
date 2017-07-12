import {Logger} from './log';
import * as sinon from 'sinon';
import {assert} from 'sinon';

describe('Log', () => {

  it('should log "Info message" when calling info function', async () => {
    let consoleInfoSpy = sinon.spy(console, 'info');
    new Logger().info('Info message');
    assert.calledWith(consoleInfoSpy, 'Info message');
  });

  it('should log "Warn message" when calling warn function', async () => {
    let consoleWarnSpy = sinon.spy(console, 'warn');
    new Logger().warn('Warn message');
    assert.calledWith(consoleWarnSpy, 'Warn message');
  });

  it('should log "Error message" when calling error function', async () => {
    let consoleErrorSpy = sinon.spy(console, 'error');
    new Logger().error('Error message');
    assert.calledWith(consoleErrorSpy, 'Error message');
  });
});
