import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiDom from 'chai-dom';
import { ProvinceFilterComponent } from './province_filter';
import {ComponentTest, MockServiceApi} from '../../util/component-test';
import Component from 'vue-class-component';
import {spy, assert} from 'sinon';

chai.use(chaiDom);
let serviceSpy = spy();

@Component({
  template: require('./province_filter.html')
})
class MockProvinceFilterComponent extends ProvinceFilterComponent {
  constructor() {
    super();
    this.serviceApi = new MockServiceApi(serviceSpy);
  }
}

describe('ProvinceFilter component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><province_filter></province_filter></div>', { 'province_filter': MockProvinceFilterComponent });
  });

  it('should verify the database mock', async () => {
    directiveTest.createComponent();
    await directiveTest.execute((vm) => {
      assert.calledWith(serviceSpy, MockServiceApi.testProvinces);
    });
  });

  it('should create a list of provinces', async () => {
    directiveTest.createComponent();
    await directiveTest.execute((vm) => {
      expect(vm.$el.querySelectorAll('.mdc-list li')).to.contain.text('All provinces');
      expect(vm.$el.querySelectorAll('.mdc-list li')).to.contain.text('Bornholm');
      expect(vm.$el.querySelectorAll('.mdc-list li')).to.contain.text('København');
      expect(vm.$el.querySelectorAll('.mdc-list li')).to.contain.text('Syd- og Sønderjylland');
    });
  });

});
