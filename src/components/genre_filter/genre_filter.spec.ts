import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiDom from 'chai-dom';
import { GenreFilterComponent } from './genre_filter';
import {ComponentTest, MockServiceApi} from '../../util/component-test';
import Component from 'vue-class-component';
import {spy, assert} from 'sinon';

chai.use(chaiDom);
let serviceSpy = spy();

@Component({
  template: require('./genre_filter.html')
})
class MockGenreFilterComponent extends GenreFilterComponent {
  constructor() {
    super();
    this.serviceApi = new MockServiceApi(serviceSpy);
  }
}

describe('GenreFilter component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><genre_filter></genre_filter></div>', {'genre_filter': MockGenreFilterComponent});
  });

  /* it('should verify the database mock', async () => {
    directiveTest.createComponent();
    await directiveTest.execute((vm) => {
      assert.calledWith(serviceSpy, MockServiceApi.testProvinces);
    });
  }); */
});
