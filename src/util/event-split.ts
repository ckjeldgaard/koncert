import {Month} from '../model/month';
import moment from 'moment';

export class EventSplit {
  private readonly events: any;

  constructor(events: any) {
    this.events = events;
  }

  public splitByMonths(): Month[] {
    let tmpEvents: Event[] = [];
    for (let key in this.events) {
      tmpEvents.push(this.events[key]);
    }
    tmpEvents.sort(this.compareEventByDate);

    // Months:
    let months: Month[] = [];
    for (let e of tmpEvents) {
      let monthName: string = moment.unix(e.dateStart).format('MMMM YYYY');
      if (this.monthExists(monthName, months)) {
        this.getMonth(monthName, months).events.push(e);
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

  private compareEventByDate(a: Event, b: Event) {
    if (a.dateStart < b.dateStart) {
      return -1;
    } else if (a.dateStart > b.dateStart) {
      return 1;
    }
    return 0;
  }
}
