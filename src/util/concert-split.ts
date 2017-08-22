import {Month} from '../model/month';
import moment from 'moment';

export class ConcertSplit {
  private readonly concerts: any;

  constructor(concerts: any) {
    this.concerts = concerts;
  }

  public splitByMonths(province?: string): Month[] {
    let tmpConcerts: Concert[] = [];
    for (let key in this.concerts) {
      this.concerts[key].id = key;
      tmpConcerts.push(this.concerts[key]);
    }
    tmpConcerts.sort(this.compareConcertByDate);

    // Months:
    let months: Month[] = [];
    for (let e of tmpConcerts) {
      if (province != null && e.province !== province) {
        continue;
      }

      // e.genres.find(x => x === 'three');

      let monthName: string = moment.unix(e.dateStart).format('MMMM YYYY');
      if (this.monthExists(monthName, months)) {
        this.getMonth(monthName, months).concerts.push(e);
      } else {
        months.push(new Month(monthName, [e]));
      }
    }

    return months;
  }

  private getMonth(monthName: String, months: Month[]): Month {
    for (let m of months) {
      if (m.name === monthName) {
        return m;
      }
    }
    return null;
  }

  private monthExists(monthName: String, months: Month[]): boolean {
    for (let m of months) {
      if (m.name === monthName) {
        return true;
      }
    }
    return false;
  }

  private compareConcertByDate(a: Concert, b: Concert) {
    if (a.dateStart < b.dateStart) {
      return -1;
    } else if (a.dateStart > b.dateStart) {
      return 1;
    }
    return 0;
  }
}
