import { expect } from 'chai';
import { HomeComponent } from '../../../src/components/home/home';
import { ComponentTest } from '../../../src/util/component-test';

describe('Home component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><home></home></div>', { 'home': HomeComponent });
  });

  /* it('should render correct contents', async () => {
    directiveTest.createComponent();
    await directiveTest.execute((vm) => {
      expect(vm.$el.querySelector('.name').textContent).to.equal('Koncert');
    });
  }); */
});
