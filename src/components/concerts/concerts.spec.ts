import { expect } from 'chai';
import { ConcertsComponent } from './concerts';
import {ComponentTest, MockServiceApi} from '../../util/component-test';
import Component from 'vue-class-component';
import {spy, assert} from 'sinon';

let serviceSpy = spy();

@Component({
  template: require('./concerts.html')
})
class MockConcertsComponent extends ConcertsComponent {
  constructor() {
    super();
    this.serviceApi = new MockServiceApi(serviceSpy);
  }
}

describe('Concerts component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><concerts></concerts></div>', { 'concerts': MockConcertsComponent });
  });

  it('should verify the database mock', async () => {
    directiveTest.createComponent();
    await directiveTest.execute((vm) => {
      assert.calledWith(serviceSpy, MockServiceApi.testConcerts);
    });
  });

});
