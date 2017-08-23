import {Criteria} from './criteria';
import {Concert} from '../../model/concert';

export class AndCriteria implements Criteria {

  private readonly criteria: Criteria;
  private readonly otherCriteria: Criteria;

  constructor(criteria: Criteria, otherCriteria: Criteria) {
    this.criteria = criteria;
    this.otherCriteria = otherCriteria;
  }

  meetCriteria(concerts: Concert[]): Concert[] {
    return this.otherCriteria.meetCriteria(
      this.criteria.meetCriteria(concerts)
    );
  }
}
