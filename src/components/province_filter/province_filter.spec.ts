import { expect } from 'chai';
import { ProvinceFilterComponent } from './province_filter';
import { ComponentTest } from '../../util/component-test';

describe('ProvinceFilter component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><province_filter></province_filter></div>', { 'province_filter': ProvinceFilterComponent });
  });
  
});
