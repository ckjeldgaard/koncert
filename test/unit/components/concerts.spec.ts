import { expect } from 'chai';
import { ConcertsComponent } from '../../../src/components/concerts/concerts';
import {ComponentTest, MockServiceApi} from '../../../src/util/component-test';
import Component from 'vue-class-component';
import {spy, assert} from 'sinon';

let serviceSpy = spy();
let mockServiceApi = new MockServiceApi(serviceSpy);

@Component({
  template: require('../../../src/components/concerts/concerts.html')
})
class MockConcertsComponent extends ConcertsComponent {
  constructor() {
    super();
    this.serviceApi = mockServiceApi;
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
      assert.calledWith(serviceSpy, mockServiceApi.concerts);
    });
  });

});
