import { spy, assert } from 'sinon';
import { expect } from 'chai';
import Component from 'vue-class-component';
import { ComponentTest } from '../../../src/util/component-test';
import {SubscriptionsComponent} from '../../../src/components/subscriptions/subscriptions';

let loggerSpy = spy();

@Component({
  template: require('../../../src/components/subscriptions/subscriptions.html')
})
class MockSubscriptionsComponent extends SubscriptionsComponent {
  constructor() {
    super();
  }
}

describe('About component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><subscriptions></subscriptions></div>', { 'subscriptions': MockSubscriptionsComponent });
  });

  it('should render correct contents', async () => {
    directiveTest.createComponent();


  });
});
