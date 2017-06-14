import Vue from 'vue';
import Component from 'vue-class-component';
import {db} from '../../data/firebase';
import {Month} from '../../model/month';
import {EventSplit} from '../../util/event-split';

@Component({
  template: require('./concerts.html')
})
export class ConcertsComponent extends Vue {

  private readonly currentTime = new Date().getTime() / 1000;
  months: Month[] = [];

  mounted() {
    let ref = db.ref('data/events').orderByChild('dateStart').startAt(this.currentTime);
    ref.on('value', (response) => {
      this.updateEvents(response.val());
    });
  }

  private updateEvents(eventData: any) {
    this.months = new EventSplit(eventData).splitByMonths();
  }
}
