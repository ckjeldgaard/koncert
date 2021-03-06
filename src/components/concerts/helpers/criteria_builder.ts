import {Criteria} from '../../../util/criteria/criteria';
import {Genre} from '../../../model/genre';
import {CriteriaProvince} from '../../../util/criteria/criteria-province';
import {AndCriteria} from '../../../util/criteria/and-criteria';
import {OrCriteria} from '../../../util/criteria/or-criteria';
import {CriteriaGenre} from '../../../util/criteria/criteria-genre';
import {CriteriaSearch} from '../../../util/criteria/criteria-search';

export class CriteriaBuilder {

  private readonly search: string;
  private readonly province: string;
  private readonly genres: Genre[];

  constructor(search: string, province: string, genres: Genre[]) {
    this.search = search;
    this.province = province;
    this.genres = genres;
  }

  public build(): Criteria {
    return new AndCriteria(
      new AndCriteria(
        new CriteriaProvince(this.province),
        this.buildGenreCriteria()
      ),
      new CriteriaSearch(this.search)
    );
  }

  private buildGenreCriteria(): Criteria {
    let genreCriteria: Criteria;
    if (this.genres.length > 1) {
      genreCriteria = new OrCriteria(
        new CriteriaGenre(this.genres[0].key),
        new CriteriaGenre(this.genres[1].key)
      );

      let i: number;
      for (i = 2; i < this.genres.length; i++) {
        genreCriteria = new OrCriteria(
          new CriteriaGenre(this.genres[i].key),
          genreCriteria
        );
      }
    } else {
      genreCriteria = (this.genres.length === 1) ? new CriteriaGenre(this.genres[0].key) : new CriteriaGenre(null);
    }
    return genreCriteria;
  }
}
