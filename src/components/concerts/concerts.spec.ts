import { expect } from 'chai';
import { ConcertsComponent } from './concerts';
import { ComponentTest } from '../../util/component-test';

describe('Concerts component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><concerts></concerts></div>', { 'concerts': ConcertsComponent });
  });

});
