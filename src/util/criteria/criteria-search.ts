import {Concert} from '../../model/concert';
import {Criteria} from './criteria';

export class CriteriaSearch implements Criteria {

  private readonly search: string;

  constructor(search: string) {
    this.search = search;
  }

  meetCriteria(concerts: Concert[]): Concert[] {
    if (this.search == null || this.search === '') {
      return concerts;
    }
    const searchTerm: string = this.search.toLowerCase();
    let searchConcerts: Concert[] = [];
    for (let concert of concerts) {
      if (concert.name.toLowerCase().includes(searchTerm)
        || concert.venue.toLowerCase().includes(searchTerm)
        || concert.artists.some(artist => artist.toLowerCase().includes(searchTerm))) {
        searchConcerts.push(concert);
      }
    }
    return searchConcerts;
  }
}
