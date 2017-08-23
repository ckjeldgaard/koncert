import {Concert} from '../../model/concert';
import {Criteria} from './criteria';

export class CriteriaProvince implements Criteria {

  private readonly province: string;

  constructor(province: string) {
    this.province = province;
  }

  meetCriteria(concerts: Concert[]): Concert[] {
    let provinceConcerts: Concert[] = [];
    for (let concert of concerts) {
      if (this.province === concert.province) {
        provinceConcerts.push(concert);
      }
    }
    return provinceConcerts;
  }
}
