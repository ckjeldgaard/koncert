import Vue from 'vue';
import Component from 'vue-class-component';
import {db} from '../../firebase';

interface Event {
  cancelled: boolean;
  dateStart: number;
  dateEnd: number;
  festival: boolean;
  name: string;
  venue: string;
}

@Component({
    template: require('./home.html')
})
export class HomeComponent extends Vue {

  events: Event[] = [];
  homeName: string = 'Koncert';

  mounted() {
    let ref = db.ref('data/events');
    ref.on('value', (snapshot) => {
      this.updateEvents(snapshot.val());
    });
  }

  private updateEvents(data: any) {
    for (let key in data) {
      let value = data[key];
      this.events.push(value);
    }
  }

}
