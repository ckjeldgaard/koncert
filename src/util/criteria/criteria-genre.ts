import {Concert} from '../../model/concert';
import {Criteria} from './criteria';

export class CriteriaGenre implements Criteria {

  private readonly genre: string;

  constructor(genre: string) {
    this.genre = genre;
  }

  meetCriteria(concerts: Concert[]): Concert[] {
    let genreConcerts: Concert[] = [];
    for (let concert of concerts) {
      if (concert.genres !== undefined && concert.genres.some(x => x === this.genre)) {
        genreConcerts.push(concert);
      }
    }
    return genreConcerts;
  }
}
