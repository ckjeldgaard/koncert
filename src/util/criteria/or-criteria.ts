import {Criteria} from './criteria';
import {Concert} from '../../model/concert';

export class OrCriteria implements Criteria {

  private readonly criteria: Criteria;
  private readonly otherCriteria: Criteria;

  constructor(criteria: Criteria, otherCriteria: Criteria) {
    this.criteria = criteria;
    this.otherCriteria = otherCriteria;
  }

  meetCriteria(concerts: Concert[]): Concert[] {
    const firstCriteriaItems: Concert[] = this.criteria.meetCriteria(concerts);
    const otherCriteriaItems: Concert[] = this.otherCriteria.meetCriteria(concerts);

    let i: number;
    for (i = 0; i < otherCriteriaItems.length; i++) {
      if (!firstCriteriaItems.find(item => item.id === otherCriteriaItems[i].id)) {
        firstCriteriaItems.push(otherCriteriaItems[i]);
        console.log('couldnt find' + otherCriteriaItems[i].id + ' in ' + firstCriteriaItems);
      }
    }
    return firstCriteriaItems;
  }
}
