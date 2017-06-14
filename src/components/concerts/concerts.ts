import Vue from 'vue';
import Component from 'vue-class-component';
import {db} from '../../data/firebase';
import moment from 'moment';

interface Month {
  name: string;
  events: Event[];
}

class MonthImpl implements Month {
  name: string;
  events: Event[];

  constructor(name: string, events: Event[]) {
    this.name = name;
    this.events = events;
  }
}

@Component({
  template: require('./concerts.html')
})
export class ConcertsComponent extends Vue {

  private readonly currentTime = new Date().getTime() / 1000;
  events: Event[] = [];

  months: Month[] = [];

  mounted() {
    let ref = db.ref('data/events').orderByChild('dateStart').startAt(this.currentTime);
    ref.on('value', (response) => {
      this.updateEvents(response.val());
    });
  }

  private updateEvents(eventData: any) {
    this.events = [];
    for (let key in eventData) {
      this.events.push(eventData[key]);
    }
    this.events.sort(this.compareEventByDate);

    // Months:
    for (let e of this.events) {
      let monthName: string = moment.unix(e.dateStart).format('MMMM YYYY');
      if (this.monthExists(monthName)) {
        this.getMonth(monthName).events.push(e);
      } else {
        this.months.push(new MonthImpl(monthName, [e]));
      }
    }

    console.log(this.months);
  }

  private getMonth(monthName: String): Month {
    for (let m of this.months) {
      if (m.name === monthName) {
        return m;
      }
    }
    return null;
  }

  private monthExists(monthName: String): boolean {
    for (let m of this.months) {
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
