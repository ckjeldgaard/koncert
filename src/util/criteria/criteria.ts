import {Concert} from '../../model/concert';

export interface Criteria {
  meetCriteria(concerts: Concert[]): Concert[];
}
